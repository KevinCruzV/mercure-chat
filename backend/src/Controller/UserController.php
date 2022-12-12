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

    #[Route('/user/{email}', name: 'app_users_email')]
    public function getUsersByEmail(UserRepository $userRepository, $email): Response
    {
        return $this->json(
            ['user' => $userRepository->findOneByEmail($email)],
            200,
            [],
            ['groups' =>['main']]
        );
    }
}
