<?php

namespace App\Domain\Events\Actions;

use App\Domain\Events\Models\Event;

class CreateEvent {
    public function execute(array $data): Event {
        return Event::create($data);
    }
}