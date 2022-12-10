<?php

namespace App\Controller;

use App\Entity\Message;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncode;

class PersistController extends AbstractController
{
    #[Route('/post-message', name: 'post-message')]
    public function postMessage(Request $request, EntityManager $em)
    {
        $request = $this->transformJsonBody($request);

        $message = new Message;
        if($request->isMethod('POST')){
            $message->setContenu($request->get("contenu"));
            $message->setChatId($request->get("chat_id"));
            $message->setUserId($request->get("email"));
            $message->setDate(new \DateTime());
            $em->persist($message);
            $em->flush();
        }

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