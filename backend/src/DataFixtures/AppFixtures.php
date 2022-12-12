<?php

namespace App\DataFixtures;
use App\Factory\ChatFactory;
use App\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {

        ChatFactory::createMany(1,[
            'suscribers' => UserFactory::createMany(2)
        ]);
    }
}