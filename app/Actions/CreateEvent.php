<?php

namespace App\Domain\Events\Actions;

use App\Models\Event;

class CreateEvent {
    public function execute(array $data): Event {
        return Event::create($data);
    }
}