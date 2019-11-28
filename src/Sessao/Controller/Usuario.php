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
use Symfony\Component\Filesystem\Filesystem;
use claviska\SimpleImage;

/**
 * Classe Usuario
 *
 * @Controller
 *
 * @author Otávio Fernandes <otavio@netonsolucoes.com.br>
 */
class Usuario extends SingularController
{
    use Crud;

    /**
     * Defina o store padrão do controlador.
     *
     * @var $store
     */
    protected $store = 'usuario';

    /**
     * Controlador que faz o upload do avatar
     *
     * @Route(method="post")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function upload(Request $request)
    {
        $fs = new Filesystem();
        $validImages = array('jpg','jpeg','png','bmp','gif');
        $files = $request->files->all();

        $file = $files['file'];


        $tmpDir = "files";

        if (in_array(strtolower($file->getClientOriginalExtension()),$validImages)) {
            $fileName = uniqid("4bud").".".strtolower($file->getClientOriginalExtension());
            $file->move($tmpDir, $fileName);
            $fullFilename = $tmpDir."/".$fileName;
            $img = new SimpleImage($fullFilename);
            $img->bestFit(250,250)->toFile($fullFilename);
            $size = $img->getWidth();
            if ($size > $img->getHeight()){
                $size = $img->getHeight();
            }
            $img->crop(0,0,$size, $size);
            $img->toFile($fullFilename);
            $imgbinary = fread(fopen($fullFilename, "r"), filesize($fullFilename));
            $img_str = 'data:image/'.strtolower($file->getClientOriginalExtension()).';base64,'.base64_encode($imgbinary);
            $fs->remove(array($fullFilename));
            return $img_str;
        } else {
            $response = array('success' => false, 'extension' => strtolower($file->getClientOriginalExtension()));
        }
        return $this->app->json($response);
    }

}