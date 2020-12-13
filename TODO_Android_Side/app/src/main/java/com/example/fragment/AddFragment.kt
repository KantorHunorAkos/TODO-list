package com.example.fragment

import android.annotation.SuppressLint
import android.app.DatePickerDialog
import android.app.TimePickerDialog
import android.os.Bundle
import android.text.TextUtils
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.view.View.OnTouchListener
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.data.Task
import com.example.todo.R
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.ktx.database
import com.google.firebase.ktx.Firebase
import kotlinx.android.synthetic.main.fragment_add.*
import kotlinx.android.synthetic.main.fragment_add.view.*
import java.util.*
import java.util.Calendar.MINUTE
import java.util.Calendar.getInstance


class AddFragment : Fragment() {
    private val mDatabaseReference: DatabaseReference = Firebase.database.reference.child("unfinished_ToDo")
    private val calendar:Calendar = getInstance()

    @SuppressLint("ClickableViewAccessibility")
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_add, container, false)

        view.dateEditText.setOnTouchListener(OnTouchListener { _, event ->
            if (event.action == MotionEvent.ACTION_UP){
                if (event.rawX >= dateEditText.right - dateEditText.compoundDrawables[2].bounds.width()){
                    val datePicker = DatePickerDialog(requireContext(),DatePickerDialog.OnDateSetListener { _, year, month, dayOfMonth->
                        val timePicker = TimePickerDialog(requireContext(),TimePickerDialog.OnTimeSetListener { _, hourOfDay, minute ->
                            val placeholderString ="$year. $month. $dayOfMonth. $hourOfDay:$minute"
                            view.dateEditText.setText(placeholderString)
                            calendar.set(year, month, dayOfMonth,hourOfDay, minute)
                        },calendar.get(Calendar.HOUR_OF_DAY),calendar.get(MINUTE),true)

                        timePicker.show()
                    },calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH))

                    datePicker.show()
                    return@OnTouchListener true
                }
            }
            false
        })

        view.addButton.setOnClickListener {_ ->
            val date = view.dateEditText.text.toString()
            val title = view.titleEditText.text.toString()
            if(!(TextUtils.isEmpty(date) || TextUtils.isEmpty(title))) {
                val task = mDatabaseReference.push().key?.let {
                    Task(date, it, title)
                }
                mDatabaseReference.setValue(task)
            }
        }

        return view
    }
}