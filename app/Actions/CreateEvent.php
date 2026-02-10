<?php

namespace App\Actions;

use App\Models\Event;

class CreateEvent {
    public function execute(array $data): Event {
        return Event::create($data);
    }
}