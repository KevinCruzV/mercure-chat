<?php

namespace App\Entity;

use App\Repository\ChatRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ChatRepository::class)]
class Chat
{

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?string $Topic = null;

    /**
     * @param string|null $Topic
     */
    public function setTopic(?string $Topic): void
    {
        $this->Topic = $Topic;
    }

    #[ORM\OneToMany(mappedBy: 'chat_id', targetEntity: Message::class)]
    private Collection $messages;

    #[ORM\ManyToMany(targetEntity: User::class, inversedBy: 'chats')]
    private Collection $suscribers;


    public function getId(): ?int
    {
        return $this->id;
    }


    public function __construct()
    {
        $this->messages = new ArrayCollection();
        $this->suscribers = new ArrayCollection();
    }

    public function getTopic(): string
    {
        return $this->Topic;
    }



    /**
     * @return Collection<int, Message>
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): self
    {
        if (!$this->messages->contains($message)) {
            $this->messages->add($message);
            $message->setChatId($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): self
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getChatId() === $this) {
                $message->setChatId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getSuscribers(): Collection
    {
        return $this->suscribers;
    }

    public function addSuscriber(User $suscriber): self
    {
        if (!$this->suscribers->contains($suscriber)) {
            $this->suscribers->add($suscriber);
        }

        return $this;
    }

    public function removeSuscriber(User $suscriber): self
    {
        $this->suscribers->removeElement($suscriber);

        return $this;
    }

}
