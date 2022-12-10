<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;


class PingController extends AbstractController
{
    #[Route("/ping/{user}", name: 'ping', methods: 'POST')]
    public function pingUser(User $user, HubInterface $hub) : JsonResponse
    {
        $update = new Update(
            [
                "https://example.com/ping",
                "https://example.com/user/{$user->getId()}/?topic" .urlencode("https://example.com/ping")
            ],
            json_encode([
                'user' => $user->getUsername(),
                'id' => $user->getId()
            ]),
            true
        );

        $hub->publish($update);

        return $this->json([
            'msg' => 'ping sent'
        ]);
    }
}