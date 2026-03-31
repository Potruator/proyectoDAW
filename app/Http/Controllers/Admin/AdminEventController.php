<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminEventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::query()
            ->latest()
            ->paginate(10)
            ->through(fn ($event) => [
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'date' => $event->date->format('d/m/Y'),
                'location' => $event->location,
                'is_public' => $event->is_public
            ]);

        return Inertia::render('Admin/Events/Index', [
            'events' => $events
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Events/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date|after:today',
            'location' => 'required|string|max:255',
            'is_public' => 'boolean'
        ]);

        try {
            Event::create($validated);

            return redirect()
                ->route('admin.events.index')
                ->with('success', 'Evento creado correctamente');
        }
        catch(\Exception $e) {
            \Log::error('Error al crear evento', [
                'error' => $e->getMessage(),
                'stack' => $e->getTraceAsString()
            ]);

            return back()
                ->with('error', 'Ocurrió un error al crear el evento. Contacte con soporte.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        return Inertia::render('Admin/Events/Show', [
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'date' => $event->date->format('d/m/Y'),
                'location' => $event->location,
                'is_public' => $event->is_public
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        return Inertia::render('Admin/Events/Edit', [
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'date' => $event->date->format('Y-m-d'),
                'location' => $event->location,
                'is_public' => $event->is_public
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date|after:today',
            'location' => 'required|string|max:255',
            'is_public' => 'boolean'
        ]);

        try {
            $event->update($validated);

            return redirect()
                ->route('admin.events.index')
                ->with('success', 'Evento actualizado correctamente');
        }
        catch(\Exception $e) {
            \Log::error('Error al actualizar evento ID: ' . $event->id, [
                'error' => $e->getMessage(),
                'stack' => $e->getTraceAsString()
            ]);

            return back()
                ->with('error', 'Ocurrió un error al actualizar el evento. Contacte con soporte.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        try {
            $event->delete();

            return redirect()
                ->route('admin.events.index')
                ->with('success', 'Evento eliminado correctamente');
        }
        catch (\Exception $e) {
            \Log::error('Error al eliminar evento ID: ' . $event->id, [
                'error' => $e->getMessage(),
                'stack' => $e->getTraceAsString()
            ]);

            return back()
                ->with('error', 'Ocurrió un error al eliminar el evento. Contacte con soporte.');
        }
    }
}
