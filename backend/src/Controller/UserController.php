<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    #[Route('/users', name: 'app_users')]
    public function getAllUsers(UserRepository $userRepository): Response
    {
        return $this->json(
            ['users' => $userRepository->findAll()],
            200,
            [],
            ['groups' =>['main']]
        );
    }
}
