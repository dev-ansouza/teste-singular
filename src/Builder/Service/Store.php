<?php
namespace Builder\Service;

use Singular\SingularService;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;
use Symfony\Component\Finder\Finder;

/**
 * Classe Store
 *
 * @Service
 *
 * @author Author <Email>
 */
class Store extends SingularService
{
    /**
     * Recupera a lista de stores da aplicação.
     *
     * @return array
     */
    public function listStores()
    {
        $app = $this->app;

        $packs = $app['builder.service.pacote']->listPacotes();
        $stores = [];

        foreach ($packs as $pack) {
            $finder = new Finder();
            $packDir = $app['singular.directory.src'].DIRECTORY_SEPARATOR.$pack['name'];

            $finder
                ->files()
                ->name('*.php')
                ->in($packDir.DIRECTORY_SEPARATOR.'Store')
                ->depth('== 0')
                ->sortByName();


            foreach ($finder as $file) {
                $stores[] = [
                    'name' => str_replace('.php','',$file->getRelativePathname()),
                    'pacote' => $pack['name']
                ];
            }

        }

        return $stores;
    }
}