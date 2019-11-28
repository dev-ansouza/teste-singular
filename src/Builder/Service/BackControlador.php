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
class BackControlador extends SingularService
{
    /**
     * Recupera a lista de controladores da aplicação.
     *
     * @return array
     */
    public function listControladores()
    {
        $app = $this->app;

        $packs = $app['builder.service.pacote']->listPacotes();
        $controllers = [];

        foreach ($packs as $pack) {
            $finder = new Finder();
            $packDir = $app['singular.directory.src'].DIRECTORY_SEPARATOR.$pack['name'];

            $finder
                ->files()
                ->name('*.php')
                ->in($packDir.DIRECTORY_SEPARATOR.'Controller')
                ->depth('== 0')
                ->sortByName();


            foreach ($finder as $file) {
                $controllers[] = [
                    'name' => str_replace('.php','',$file->getRelativePathname()),
                    'pacote' => $pack['name']
                ];
            }

        }

        return $controllers;
    }
}