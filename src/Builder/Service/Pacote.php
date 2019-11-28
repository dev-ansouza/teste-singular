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
class Pacote extends SingularService
{
    /**
     * Recupera a lista de pacotes da aplicação.
     *
     * @return array
     */
    public function listPacotes()
    {
        $app = $this->app;

        $finder = new Finder();

        $finder
            ->directories()
            ->in($app['singular.directory.src'])
            ->depth('== 0')
            ->sortByName();

        $packs = [];

        foreach ($finder as $dir) {
            $packName = $dir->getRelativePathname();

            $configFile = $app['singular.directory.app'].DIRECTORY_SEPARATOR."packs".DIRECTORY_SEPARATOR.strtolower($packName).".php";

            $packs[] = [
                'name' => $dir->getRelativePathname(),
                'active' => file_exists($configFile) ? true : false
            ];
        }

        return $packs;
    }
}