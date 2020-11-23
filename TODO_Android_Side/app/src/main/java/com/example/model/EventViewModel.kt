package com.example.model

import androidx.lifecycle.ViewModel

class EventViewModel: ViewModel() {
    private var events: ArrayList<Event> = arrayListOf()

    fun getEvents() = events

    fun addEvent(event: Event)
    {
        events.add(event)
    }
}