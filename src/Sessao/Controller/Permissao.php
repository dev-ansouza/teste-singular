<?php
namespace Sessao\Controller;

use Symfony\Component\HttpFoundation\Request;
use Singular\SingularController;
use Singular\Crud;
use Singular\Annotation\Controller;
use Singular\Annotation\Route;
use Singular\Annotation\Direct;
use Singular\Annotation\Value;
use Singular\Annotation\Assert;
use Singular\Annotation\Convert;
use Singular\Annotation\After;
use Singular\Annotation\Before;
use Singular\Response\JsonResponse;

/**
 * Classe Permissao
 *
 * @Controller
 *
 * @package Administracao\Controller;
 */
class Permissao extends SingularController
{
    use Crud;

    /**
     * Defina o store padrão do controlador.
     *
     * @var $store
     */
    protected $store = 'permissao';

    /**
     * Retorna a lista de permissoes de um perfil de usuário pelo seu ID.
     *
     * @Route(method="post")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function listarPermissoes(Request $request)
    {
        $app = $this->app;

        $dados = $request->request->all();
        $sessao = $app['session']->get($app['session.name']);

        $permissoes = $app['sessao.store.permissao']->findBy([
            'perfil_id' => '=:' . $dados['id']
        ]);

        $componentes = $app['sessao.store.componente']
            ->setProfile('permissao')
            ->findBy([
                'p.perfil_id' => '=:'.$sessao['perfil_id']
            ]);

        if (count($permissoes) == 0) {
            return $app->json([
                'results' => $componentes
            ]);
        } else {
            foreach ($permissoes as $permissao) {
                $i=0;

                foreach ($componentes as $componente) {

                    if ($permissao['componente_id'] == $componente['id']) {
                        if ($componente['tipo'] == 'M') {

                        } else {
                            $componentes[$i]['state'] = ["selected"=>true,"opened"=>true] ;
                        }
                    }

                    $i++;
                }
            }

            return $app->json([
                'results' => $componentes
            ]);
        }
    }


    /**
     * Função responsável por salvar o registro de uma tabela do crud.
     *
     * @Route(method="post")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function save(Request $request)
    {
        $app = $this->app;

        /**
         * @var Cadastro\Store\Permissao
         */
        $store = $this->getStore();

        try {
            $data = $request->request->all();

//            $dados = $data['data'];
//            print_r($data);die;

            $permissaoId = 1;

            $permissoes = $app['sessao.store.permissao']->findBy(array('perfil_id' => '=:' . $data['id']));

            if (count($permissoes) > 0) {
                foreach($permissoes as $permissao){
                    $app['sessao.store.permissao']->remove($permissao['id']);
                }
            }

            if (count($data['selecteds']) > 0) {
                foreach($data['selecteds'] as $selected){
                    $dataSave = array();

                    if($selected == '#'){
                    }else{
                        $dataSave['perfil_id']= $data['id'];
                        $dataSave['componente_id']= $selected;
                        $permissaoId = $app['sessao.store.permissao']->save($dataSave);
                    }
                }
            }


            $success = true;
        } catch (\Exception $e){
            print_r($e->getMessage());die;
            $success = false;
            $permissaoId = -1;
        }

        return $app->json(array(
            'success' => $success,
            'record' => $permissaoId
        ));

    }


    /**
     * Copia as permissões de uma função para outra.
     *
     * @Route(method="post")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function copiaPermissoesPerfil(Request $request)
    {

        try {

            $app = $this->app;

            $data = $request->request->all();

            $store = $this->getStore();


            $store->removeBy(array('perfil_id' => $data['destino_perfil_id']));


            $filters['perfil_id'] = $data['origem_perfil_id'];
            $pageOpts = array();
            $sort = array();

            $permissoes = $store->findBy($filters, $pageOpts, $sort);

            foreach ($permissoes as $permissao) {

                $data_permissao = array();

                $data_permissao['componente_id'] = $permissao['componente_id'];
                $data_permissao['perfil_id'] = $data['destino_perfil_id'];

                $store->save($data_permissao);

            }

            $success = true;
            

        } catch (\Exception $e) {

            print_r($e->getMessage());
            $success = false;

        }


        return $app->json(array(
            'success' => $success
        ));
    }
}