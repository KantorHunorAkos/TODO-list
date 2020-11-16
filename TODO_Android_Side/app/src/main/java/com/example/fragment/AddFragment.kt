package com.example.fragment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import com.example.todo.R
import com.example.todo.databinding.FragmentAddBinding

class AddFragment : Fragment() {

    lateinit var binding : FragmentAddBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(inflater,
            R.layout.fragment_add, container, false)
        val view = binding.root

        binding.addButton.setOnClickListener {
            // TODO: 2020. 11. 07. add to list
        }

        return view
    }
}