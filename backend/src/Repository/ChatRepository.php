<?php

namespace App\Repository;

use App\Entity\Chat;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Chat>
 *
 * @method Chat|null find($id, $lockMode = null, $lockVersion = null)
 * @method Chat|null findOneBy(array $criteria, array $orderBy = null)
 * @method Chat[]    findAll()
 * @method Chat[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ChatRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Chat::class);
    }

    public function save(Chat $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Chat $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return Chat[] Returns an array of Chat objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

    public function findOneById($value): ?Chat
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.id = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
            ;
    }

    public function findOneBySuscribers($user1, $user2): ?Chat
    {
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery(
            'SELECT topic FROM App\Entity\Chat AS c
            INNER JOIN chat_user AS cu 
            ON c.id  = cu.chat_id  
            INNER JOIN user AS u 
            ON u.id = cu.user_id 
            WHERE u.email = :email1 
            UNION
            SELECT topic FROM App\Entity\Chat AS c
            INNER JOIN chat_user AS cu 
            ON c.id  = cu.chat_id  
            INNER JOIN user AS u 
            ON u.id = cu.user_id 
            WHERE u.email = :email2'

        )->setParameter('email1', $user1)
            ->setParameter("email2",$user2);

        return $query->getResult();
    }

}
