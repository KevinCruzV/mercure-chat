<?php

namespace App\Controller;

use App\Repository\ChatRepository;
use App\Repository\UserRepository;
use App\Entity\User;
use Doctrine\ORM\NonUniqueResultException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;

class TopicController extends AbstractController
{



    /**
     * @throws NonUniqueResultException
     */
    #[Route('/topic/{user1}/{user2}', name: 'app_topic', methods: 'GET')]
    public function getTopicName(User $user1, User $user2, ChatRepository $chatRepository): JsonResponse
    {
           $topic = $chatRepository->findOneBySuscribers($user1, $user2);


        return $this->json(
            [
            'topic' => $topic,
            ]
        );
    }

        /**
         * @throws NonUniqueResultException
         */
        #[Route('/chat/{topic}', name: 'app_topic_msg', methods: 'GET')]
        public function getTopicMsg($topic, ChatRepository $chatRepository): JsonResponse
        {

            return $this->json(
                [
                'chatMsg' => $chatRepository->getAllMessagesOrderByDate($topic)
                ]
            );
        }

}