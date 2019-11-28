<?php

namespace Sessao\Command;

use Singular\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * Classe do comando.
 *
 * @author Author <author@email.com>
*/
class CriaPerfilCommand extends Command
{
    /**
     * Configura o comando.
     */
    public function configure()
    {
        $this->setName('sessao:cria-perfil')
            ->setDescription('Cria um novo registro de perfil na aplicação')
            ->setHelp('Para criar um novo perfil, informe o nome do perfil a ser criado. Ex.: singular sessao:cria-perfil Perfil')
            ->addArgument(
                'perfil',
                InputArgument::REQUIRED,
                'Nome do perfil a ser criado'
            );
    }

    /**
     * Executa o comando.
     *
     * @param InputInterface $input
     * @param OutputInterface $output
     */
    public function execute(InputInterface $input, OutputInterface $output)
    {
        $app = $this->getSilexApplication();

        $perfil = $app['sessao.store.perfil']->save([
            'perfil' => $input->getArgument('perfil'),
            'ativo' => 1
        ]);

        if ($perfil instanceof \Exception) {
            $output->writeln(sprintf('<error>%d %s</error>', $perfil->getCode(), $perfil->getMessage()));
        } else {
            $output->writeln(sprintf('<info>Perfil "%s" criado com sucesso</info>', $input->getArgument('perfil')));
        }

    }
}
