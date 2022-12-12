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
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncode;

class PersistController extends AbstractController
{
    public function __construct(ChatRepository $chatRepository, UserRepository $userRepository)
    {
        $this->chatRepository = $chatRepository;
        $this->userRepository = $userRepository;
    }

    #[Route('/post-message', name: 'post-message', methods: "POST")]
    public function postMessage(Request $request, EntityManagerInterface $em)
    {

        $data = json_decode($request->getContent(), true);

        var_dump($data);

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

    protected function transformJsonBody(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return null;
        }

        if ($data === null) {
            return $request;
        }

        $request->request->replace($data);

        return $request;
    }
}