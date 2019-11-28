<?php
namespace Builder\Service;

use Singular\SingularService;
use Singular\Annotation\Service;
use Singular\Annotation\Parameter;
use Symfony\Component\Finder\Finder;


/**
 * Classe Modulo
 *
 * @Service
 *
 * @author Author <Email>
 */
class Modulo extends SingularService
{
    /**
     * Recupera a lista de módulos da aplicação de forma hierárquica.
     *
     * @param string $path
     * @return array
     */
    public function listModulos($path)
    {
        $app = $this->app;

        $parents = explode('/', $path);
        $modulos = [];

        for ($i = 0; $i < count($parents); $i++) {
            $finder = new Finder();
            $parent = $this->getPath($i, $parents);
            $previous = '';

            if ($i > 0) {
                $previous = $this->getPath($i -1, $parents);
            }

            $parentDir = $app['injector.directory.src'].DIRECTORY_SEPARATOR.$parent;

            $finder
                ->files()
                ->name('*.js')
                ->in($parentDir)
                ->depth('== 1')
                ->sortByName();

            $modulo = ['name' => $parents[$i],'parent' => $previous];

            foreach ($finder as $file) {
                $moduleFile = str_replace('.js','',$file->getFilename());

                if ($file->getRelativePath() == $moduleFile) {
                    $modulo['childs'][] = [
                        'name' => $moduleFile,
                        'parent' => $parent
                    ];

                }
            }

            $modulos[] = $modulo;

        }

        return $modulos;
    }

    /**
     * Recupera o caminho completo de um módulo.
     *
     * @param $index
     * @param $list
     *
     * @return string
     */
    private function getPath($index, $list)
    {
        $parents = array_slice($list, 0, $index+1);

        return implode(DIRECTORY_SEPARATOR, $parents);
    }

}