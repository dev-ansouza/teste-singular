<?php
namespace Builder\Service;

use Singular\SingularService;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;
use Symfony\Component\Finder\Finder;


/**
 * Classe FrontView
 *
 * @Service
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class FrontView extends SingularService
{
    /**
     * Recupera a lista de pacotes da aplicação.
     *
     * @param {string} $path
     *
     * @return array
     */
    public function listViews($path)
    {
        $app = $this->app;

        $finder = new Finder();

        $viewDir = $app['injector.directory.src'].$path.DIRECTORY_SEPARATOR.'views';

        $views = [];

        if (is_dir($viewDir)) {
            $finder
                ->files()
                ->name('*.html')
                ->in($viewDir)
                ->depth('== 0')
                ->sortByName();


            foreach ($finder as $file) {

                $views[] = [
                    'name' => $file->getRelativePathname()
                ];
            }

        }

        return $views;
    }
}