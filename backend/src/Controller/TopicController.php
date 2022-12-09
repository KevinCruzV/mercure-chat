<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;

class TopicController extends AbstractController
{
    #[Route('/chat/{topic}', name: 'app_topic')]
    public function getAllChatMessage(HubInterface $hub): JsonResponse
    {

        $update = new Update(
            [
                "https://exemple.com/chat",
                ""
            ],
    
            json_encode([
    
            ]),
            true

        );

        $hub->publish($update);

        return $this->json([
            'message' => 'message sent'],
            200
        );
    }
}