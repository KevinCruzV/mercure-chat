<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

class PublishController extends AbstractController
{
    #[Route('/mercure-publish', name: 'mercure-publish')]
    public function publish(HubInterface $hub): Response
    {
        $update = new Update(
            'https://example.com/my-private-topic',
            json_encode(['message' => 'Hello'])
        );

        $hub->publish($update);

        return new Response('published');
    }
}