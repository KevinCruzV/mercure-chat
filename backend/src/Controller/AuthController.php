<?php

namespace App\Controller;

use App\Service\CookieHelper;
use App\Service\JWTHelper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AuthController extends AbstractController
{
    #[Route('/auth', name: 'app_auth')]
    public function login(CookieHelper $cookieHelper, JWTHelper $JWTHelper): Response
    {
        $user = $this->getUser();
        if($user){
            return $this->json(
                ['message' => 'cookie set'],
                200,
                ['set-cookie' => $cookieHelper->buildCookie()]
            );
        }

        return $this->json(
            ['message' => 'Bad credentials'],
            401
        );
    }
}
