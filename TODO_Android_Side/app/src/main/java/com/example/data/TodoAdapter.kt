package com.example.data

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.todo.R
import kotlinx.android.synthetic.main.todo_item.view.*

class TodoAdapter(private val taskList: List<Task>): RecyclerView.Adapter<TodoAdapter.TaskViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TaskViewHolder {
        val taskView = LayoutInflater.from(parent.context).inflate(R.layout.todo_item,parent,false)
        return TaskViewHolder(taskView)
    }

    override fun onBindViewHolder(holder: TaskViewHolder, position: Int) {
        val currentItem = taskList[position]
        
        holder.title.text = currentItem.title
        holder.date.text = currentItem.date
    }

    override fun getItemCount(): Int = taskList.size

    inner class TaskViewHolder(taskView: View): RecyclerView.ViewHolder(taskView) {
        val title:TextView = taskView.titleTextView
        val date:TextView = taskView.dateTextView
    }
}