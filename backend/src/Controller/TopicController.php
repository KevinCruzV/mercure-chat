<?php

namespace App\Controller;

use App\Repository\ChatRepository;
use App\Repository\UserRepository;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;

class TopicController extends AbstractController
{
    #[Route('/message/{topic}', name: 'app_topic')]
    public function getAllChatMessage(HubInterface $hub): \Symfony\Component\HttpFoundation\JsonResponse
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




    #[Route('/topic/{user1}/{user2}', name: 'app_topic')]
    public function getTopicName($user1, $user2, ChatRepository $chatRepository): \Symfony\Component\HttpFoundation\JsonResponse
    {

        return $this->json(
            ['topic' => $chatRepository->findOneBySuscribers($user1, $user2)]
        );
    }

}