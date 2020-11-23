package com.example.model

import java.util.*

enum class EventType{
    Type1,
    Type2,
    Type3
}

class Event(var name:String, var type:EventType, var details:String, var date:Date) {}