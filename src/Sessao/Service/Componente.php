<?php
namespace Sessao\Service;

use Cocur\Slugify\Slugify;
use Singular\SingularService;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;


/**
 * Classe Componente
 *
 * @Service
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class Componente extends SingularService
{
    /**
     * Cria um novo componente a partir de um módulo recém criado.
     *
     * @param string $moduloId
     * @param array  $moduloData
     */
    public function createFromModulo($moduloId, $moduloData)
    {
        $app = $this->app;

        $componentExists = $app['sessao.store.componente']->findOneBy([
            'menu_id' => $moduloId
        ]);

        if (!$componentExists) {
            $slugfy = new Slugify();

            $data = [
                'tipo' => 'M',
                'icon' => $moduloData['icon_cls'],
                'menu_id' => $moduloId,
                'text' => $moduloData['modulo'],
                'chave' => 'm-'.$slugfy->slugify($moduloData['modulo'],'_'),
                'parent_id' => null,
                'parent' => '#',
                'session.perfil_id' => $moduloData['session.perfil_id']
            ];

            $this->saveComponente($data);
        }
    }

    /**
     * Salva o registro de um componente no banco de dados.
     *
     * @throws \Exception
     *
     * @param array $data
     *
     * @return integer ID do componente salvo.
     */
    public function saveComponente($data)
    {
        $app = $this->app;

        $data['parent'] = $this->getParent($data);

        $hasId = isset($data['id']) ? true : false;

        if (!$hasId) {
            $data['id'] = uniqid();
        }

        $componenteId = $app['sessao.store.componente']->save($data);

        if (!$hasId && $data['tipo'] == 'M') {
            $this->createSubComponentes($componenteId, $data['text']);

            // garante acesso aos componentes criados para o usuário logado
            $app['singular.service.component']->grantFullAccess($data['session.perfil_id']);
        }
    }

    /**
     * Cria o registro de subcomponentes de componentes do tipo módulo.
     *
     * @param integer $componenteId
     * @param string $componente
     */
    private function createSubComponentes($componenteId, $componente)
    {
        $app = $this->app;

        $nomeModulo = $this->getNomeModulo($componente);

        $data = [
            'id' => uniqid(),
            'text' => 'Listar',
            'tipo' => 'F',
            'icon' => 'fa fa-list',
            'parent' => $componenteId,
            'chave' => 'f-' . $nomeModulo . '-list'
        ];

        // componente de listagem
        $app['sessao.store.componente']->save($data);
        
        // componente de criação
        $app['sessao.store.componente']->save([
            'id' => uniqid(),
            'text' => 'Criar',
            'tipo' => 'F',
            'icon' => 'fa fa-check',
            'parent' => $componenteId,
            'chave' => 'f-' . $nomeModulo . '-create'
        ]);

        // componente de edição
        $app['sessao.store.componente']->save([
            'id' => uniqid(),
            'text' => 'Editar',
            'tipo' => 'F',
            'icon' => 'fa fa-edit',
            'parent' => $componenteId,
            'chave' => 'f-' . $nomeModulo . '-edit'
        ]);

        // componente de exclusão
        $app['sessao.store.componente']->save([
            'id' => uniqid(),
            'text' => 'Remover',
            'tipo' => 'F',
            'icon' => 'fa fa-trash',
            'parent' => $componenteId,
            'chave' => 'f-' . $nomeModulo . '-remove'
        ]);

        // componente de visualização
        $app['sessao.store.componente']->save([
            'id' => uniqid(),
            'text' => 'Visualizar',
            'tipo' => 'F',
            'icon' => 'fa fa-eye',
            'parent' => $componenteId,
            'chave' => 'f-' . $nomeModulo . '-show'
        ]);
    }

    /**
     * Retorna um nome válido para o módulo, removendo acentuação e caracteres especiais.
     *
     * @param string $text
     *
     * @return string
     */
    private function getNomeModulo($text)
    {
        $slugfy = new Slugify();

        return $slugfy->slugify($text,'_');
    }

    /**
     * Retorna a identificação do parent do registro.
     *
     * @param array $data
     *
     * @return mixed
     */
    private function getParent($data)
    {
        $parent = '#';

        if (isset($data['parent'])) {
            if ($data['parent'] == null || $data['parent'] == '') {
                $parent = '#';
            } else {
                $parent = $data['parent'];
            }
        }

        return $parent;
    }
}