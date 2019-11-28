<?php
namespace Builder\Service;

use Singular\SingularService;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;
use Symfony\Component\Finder\Finder;


/**
 * Classe FrontControlador
 *
 * @Service
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class FrontControlador extends SingularService
{
    /**
     * Recupera a lista de pacotes da aplicação.
     *
     * @param {string} $path
     *
     * @return array
     */
    public function listControladores($path)
    {
        $app = $this->app;

        $finder = new Finder();

        $controllerDir = $app['injector.directory.src'].$path.DIRECTORY_SEPARATOR.'controllers';

        $controllers = [];

        if (is_dir($controllerDir)) {
            $finder
                ->files()
                ->name('*.js')
                ->in($controllerDir)
                ->depth('== 0')
                ->sortByName();


            foreach ($finder as $file) {

                $controllers[] = [
                    'name' => $file->getRelativePathname()
                ];
            }

        }

        return $controllers;
    }
}