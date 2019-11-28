<?php
namespace Builder\Service;

use Singular\SingularService;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;
use Symfony\Component\Finder\Finder;


/**
 * Classe Builder
 *
 * @Service
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class BackServico extends SingularService
{
    /**
     * Recupera a lista de serviços da aplicação.
     *
     * @return array
     */
    public function listServicos()
    {
        $app = $this->app;

        $packs = $app['builder.service.pacote']->listPacotes();
        $services = [];

        foreach ($packs as $pack) {
            $finder = new Finder();
            $packDir = $app['singular.directory.src'].DIRECTORY_SEPARATOR.$pack['name'];

            $finder
                ->files()
                ->name('*.php')
                ->in($packDir.DIRECTORY_SEPARATOR.'Service')
                ->depth('== 0')
                ->sortByName();


            foreach ($finder as $file) {
                $services[] = [
                    'name' => str_replace('.php','',$file->getRelativePathname()),
                    'pacote' => $pack['name']
                ];
            }

        }

        return $services;
    }
}