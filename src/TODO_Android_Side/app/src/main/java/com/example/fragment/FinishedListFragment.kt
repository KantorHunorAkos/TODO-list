package com.example.fragment

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.data.FinishedAdapter
import com.example.data.Task
import com.example.data.TodoAdapter
import com.example.todo.R
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.ValueEventListener
import com.google.firebase.database.ktx.database
import com.google.firebase.database.ktx.getValue
import com.google.firebase.ktx.Firebase
import kotlinx.android.synthetic.main.fragment_finished_list.*
import kotlinx.android.synthetic.main.fragment_finished_list.view.*
import kotlinx.android.synthetic.main.fragment_todo_list.*
import kotlinx.android.synthetic.main.fragment_todo_list.view.*
import java.text.SimpleDateFormat
import java.util.*

class FinishedListFragment : Fragment() {
    private var taskList: MutableList<Task> = mutableListOf()
    private val mDatabaseReference: DatabaseReference = Firebase.database.reference.child("finished_ToDo")
    private var adapter = FinishedAdapter(taskList)

    private val eventListener = object : ValueEventListener {
        override fun onDataChange(dataSnapshot: DataSnapshot) {
            if(dataSnapshot.exists()) {
                for (it in dataSnapshot.children) {
                    val task = Task((it.getValue<Task>()!!).date,(it.getValue<Task>()!!).key,(it.getValue<Task>()!!).title)
                    taskList.add(task)
                }
                Log.d("Task1", taskList.size.toString())
                adapter = FinishedAdapter(taskList)
                finished_recycler_view.adapter = adapter
            }
        }

        override fun onCancelled(databaseError: DatabaseError) {
            Log.d("Database error", "loadTask:onCancelled", databaseError.toException())
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_finished_list, container, false)

        mDatabaseReference.addValueEventListener(eventListener)
        view.finished_recycler_view.layoutManager = LinearLayoutManager(requireContext())

        return view
    }
}