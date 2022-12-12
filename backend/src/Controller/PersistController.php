<?php

namespace App\Controller;


use App\Entity\Chat;
use App\Entity\Message;
use App\Entity\User;
use App\Repository\ChatRepository;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NonUniqueResultException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


class PersistController extends AbstractController
{
    private ChatRepository $chatRepository;
    private UserRepository $userRepository;

    public function __construct(ChatRepository $chatRepository, UserRepository $userRepository)
    {
        $this->chatRepository = $chatRepository;
        $this->userRepository = $userRepository;
    }

    /**
     * @throws NonUniqueResultException
     */
    #[Route('/post-message', name: 'post-message', methods: "POST")]
    public function postMessage(Request $request, EntityManagerInterface $em): \Symfony\Component\HttpFoundation\JsonResponse
    {

        $data = json_decode($request->getContent(), true);



        $message = new Message();


        $contenu = $data['contenu'];
        $chatId = $data['chat_id'];
        $dataEmail = $data['email'];
        $chat = $this->chatRepository->findOneById($chatId);
        $email = $this->userRepository->findOneById($dataEmail);


        $message->setContenu($contenu);
        $message->setChatId($chat);
        $message->setUserId($email);
        $message->setDate(new \DateTime());
        $em->persist($message);
        $em->flush();


        return $this->json([
            "message" => "saved"
        ], 201);
    }

}