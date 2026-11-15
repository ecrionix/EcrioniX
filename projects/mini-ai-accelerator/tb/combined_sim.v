`timescale 1ns / 1ps


module mem_file_writer;
  integer f1, f2;
  initial begin
    f1 = $fopen("w1.mem", "w");
    $fwrite(f1, "00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\nFF\n00\n00\n00\n02\n00\n00\n00\n01\n00\n00\n00\n00\n00\n00\n00\nFF\n00\n00\n00\n00\n00\nFF\n02\n00\n00\n00\n00\n00\n00\n00\n00\nFF\n00\n00\n00\n01\n00\n00\n00\n01\n00\n00\n00\n00\n00\n00\n00\n00\n00\nFF\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\nFF\n00\n00\nFC\nFF\n00\n01\n05\n00\n00\nFF\n02\n00\n00\n00\n00\n01\n02\n00\nFE\n00\nFF\n00\n00\n00\n00\n04\n00\n00\n00\n00\nFF\nFF\n00\n00\n00\n00\n00\n00\n00\n01\n00\n00\n01\n01\n00\n00\n01\n00\n00\n00\n00\n00\nFF\n00\n00\nFF\n00\n00\n00\n00\n00\n00\n00\n00\n00\n04\nFE\n00\n02\n01\n01\n01\n00\n00\n09\nFE\nFD\n00\n00\n00\n00\n00\nFF\n01\nFE\n00\n00\nFE\nFF\n01\n00\n00\nFF\n00\n00\nFE\n00\n11\nF1\n00\n05\n06\n08\n10\n02\n01\n27\nF8\nF5\nFE\nFE\nFD\nFF\n05\n00\nFC\nFA\n00\n00\nFB\nFA\n04\n09\n00\nFC\n00\n00\nFE\n00\nF6\nF9\nFF\n06\n08\n0A\n0E\n05\nFA\n08\n06\n0F\n10\nF1\nFB\nFF\n0A\nF4\nFD\nF3\n00\nFE\n03\n03\n0F\n04\n0B\nFB\n00\n02\n04\n00\n03\n06\nFE\n00\n09\n09\n04\n01\nEA\nF3\nEE\nED\n27\n17\nDF\n0F\n0F\nED\nF9\nE2\n00\nFF\n0E\n13\n1A\n05\n11\nF4\n00\n00\n00\n00\n1B\n03\nFB\n00\n09\n0F\n06\n00\nF9\n07\nEB\nE6\n11\n04\nF2\n16\n16\nFA\nF4\nFB\n00\n00\nF8\n01\n00\n02\n00\nFA\n00\nFF\n00\n00\n04\n00\n00\n01\n01\nFE\nFF\n00\n04\n0B\nFC\n00\nFD\nFD\n05\n00\n02\n02\n03\n00\n00\n00\n01\nFF\nFC\n01\nFE\n00\n00\n00\n00\n00\n01\n00\n00\n00\n01\n00\n00\n00\n01\n03\nFE\n00\n00\nFE\n02\n00\n00\n00\n02\n00\n00\n00\n02\nFF\n00\n00\n00\n00\n00\n00\n00\n00\n08\n00\n00\n00\n03\n00\n00\n00\n03\n13\nFB\nFB\n05\nFF\n04\nFE\n0D\nFE\n04\nF0\n00\n00\n0A\n00\n02\n01\nFE\nFF\n00\nF9\n00\n00\n07\nFF\n00\n00\n05\n07\n00\n00\n02\n13\nF9\nFC\n06\nFE\n08\nFE\n0B\nFA\n05\nF1\n00\n00\n0C\nFB\n0A\n01\nFF\n01\n00\nF9\n00\n00\n03\n00\n00\n00\n08\n13\n00\n00\nFC\n02\nF7\n00\n00\n06\n07\n05\n00\nF5\nFE\nFE\n00\n00\n03\nF5\n14\n00\n00\n03\n00\nFF\n00\n00\n01\n00\n00\n00\n02\n05\n00\n00\nFF\n03\nFE\n00\n00\n01\n02\n02\n00\nFD\nFF\nFF\n00\n00\n01\nFE\n05\n00\n00\n01\nFF\nFE\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n01\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n01\n00\n00\n00\n00\nFF\n00\n00\n00\nFF\n00\n00\n00\n00\nFF\n00\n00\n01\n00\n00\n00\n00\n00\n00\n00\n00\n00\nFF\n00\n00\n01\n00\n07\nF9\n00\n00\n05\n04\nFF\n01\n02\n01\n00\n02\n00\n00\nFE\n00\n00\n03\n04\nFE\nF8\n00\nFD\nFC\n00\n01\n00\nFD\nFB\nFC\n01\n00\n14\n02\n02\n02\n07\nFE\nFC\nFE\nFC\n09\nEA\nF5\nF8\n02\nFA\nF3\n00\n11\nFF\nFF\nFB\n00\n08\nF5\n02\n05\n00\n06\nFD\nFE\n00\n00\n2F\n17\n0D\n10\nFB\nE8\n10\nFF\n09\n0B\nD8\nE5\nEE\n0B\nF1\nE9\n02\n2D\nFA\n08\nFD\nFB\n0A\nF5\nF0\n1C\nFF\n08\nFF\n00\nFC\n00\n32\n22\n09\n14\nF8\nF8\n1F\n02\nFB\n13\nE8\nE1\nF5\n15\nEA\nE4\n12\n2B\nF4\nF7\nFB\n09\n05\n10\nDF\n26\n08\n0A\n0D\nF3\n08\n00\n3D\nF8\nFB\n17\n0E\n24\n25\n01\nFA\n22\nDC\nE8\nDE\n0F\nF7\nEE\n1C\n1C\n03\nF6\nE2\n14\n11\n08\nF2\n1C\n0F\n06\n01\nED\nFA\n00\n0D\nF8\nF8\n19\n0F\n08\n33\nF6\n21\n05\n0C\n10\nDD\n0E\n2A\nE4\n12\n19\n18\nF4\nC4\nFE\n13\nF2\nF0\nD5\n06\n06\nE9\nF4\nF9\n00\nFA\n0C\nE7\nFD\n19\n2A\n06\nF8\nFF\nE4\n03\n09\n33\n03\nE5\nC3\n1E\n01\n03\nF7\nB7\nE5\n2E\n1A\n04\nE7\n1D\nD7\nDC\nDF\n13\n00\n1E\nE8\n01\n12\n12\n16\nF4\nF9\n09\n38\nF1\n07\n07\nE7\n00\nD4\n30\n1D\nEA\n0A\nC4\n16\n1E\n19\nFD\nE9\n0B\n08\nD1\nD9\n09\n00\n1E\n17\n08\nFE\n06\nF9\nE6\nFD\nEC\n2B\nE2\nEB\n14\nF3\nF0\nE4\n12\n13\nE3\nF1\nF0\n22\n28\n20\nFB\n07\n13\nFA\nED\nF2\n23\n00\n32\n06\nF1\nF4\n09\nF9\nFB\n02\nD5\n19\nEE\nD7\n28\nFD\nED\nEE\n0C\nFC\nFE\nE4\nF4\n13\n2B\n22\n1A\n05\nF8\nEE\nEC\nEF\n10\n00\n14\nDE\nC4\nEE\n1E\n01\nE6\nFF\nE6\n01\n03\nEA\n2D\nE8\nF1\nFA\n17\nED\n17\nDE\nFC\nEF\n13\n15\n13\n20\nED\nEB\nFC\n0E\n10\n00\nFF\nCD\nCB\n01\n34\n02\n01\n06\n04\nFE\nEA\nDF\n31\nF9\nEB\n12\n2A\nE1\n2C\nE4\n09\n08\nFE\nF0\n1B\n24\nF4\n0E\nE5\nFA\nE7\n00\nED\nF9\nF0\nEB\n07\n18\n00\n08\nE7\n06\nE1\nEF\n25\nF7\nDA\n09\n19\nE5\n25\nE3\nFA\n0E\n2A\n1B\n0B\n29\nFD\nDA\nFE\nF3\nDE\n00\n05\nFB\nFE\n03\n07\n0D\n00\n02\nF3\nF9\nDB\nF4\n05\nFE\nEE\n06\n14\nF5\n13\nFB\n00\n18\n20\n05\n06\n1C\n02\nF9\n00\nF4\nFB\n00\n14\n00\nF4\n09\n13\n0C\n03\n01\n03\nFA\nD2\nFC\nE5\n03\n10\n09\n14\nFE\n10\n08\n00\n17\n11\nF1\n13\n0D\n03\n08\n00\nF3\n00\n00\n08\n00\nF9\n01\n0C\n18\n02\n00\n01\n01\nE6\nFF\nFB\n02\n0D\n04\n05\nF4\n0A\nFB\n00\n16\n0A\nEF\n18\n02\n00\n02\nFF\nF4\nFC\n00\n10\n01\n02\n01\nFE\n05\n02\n00\nFE\n01\nF2\nFB\nFC\n0A\nFF\n03\n03\n08\n01\n04\n00\n11\n01\n05\nFF\n00\nFF\nFB\n00\nF2\n02\n00\n09\n0B\n01\n00\nF9\n01\n04\n00\n02\n00\n00\nFE\n00\n02\nFE\nF8\n03\n0F\nFF\n02\n00\n00\n03\n0B\nF2\n00\nFE\nF9\n00\n00\n01\n00\n03\n07\n00\n00\nFC\n00\n03\n00\n01\n00\n01\n00\n00\n00\nFE\nFB\n00\n06\n00\n00\n00\n00\n02\n06\nF7\n00\n00\nFD\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\nFC\n0E\n00\nFF\nFC\n00\n00\n00\n00\nF1\n02\n00\n02\n01\nF5\nFA\n00\n02\n00\n00\n00\n00\n05\n0E\nFA\n02\n03\nFD\n08\n00\n0E\n00\n00\n02\n00\n00\n00\n00\n00\n00\n00\nFD\n00\n00\n00\n03\nFE\n00\n00\n00\n00\n00\n00\n00\n01\n02\n00\n00\n00\nFF\n01\nFE\n02\n00\n0F\n00\nF5\n03\n08\n05\n00\n00\nFF\n00\n00\nF4\nF6\n0D\n04\n04\nFE\n01\nFA\n00\n00\n00\n00\n00\n00\n03\n00\n01\n00\n00\nFD\n00\n25\nE7\nFA\n05\n0E\n08\n01\n06\nFF\n0F\nE6\nF6\n03\n04\n28\n0E\nFF\nFD\n0C\nF6\n00\n03\n01\nE6\n10\nFE\nF6\n09\nE8\nFB\nE6\n00\n24\nFD\n05\n00\n07\n1D\n06\n03\nE3\n31\nE1\nFA\n13\n12\n0B\n00\nFE\n00\n04\nF2\nE9\n01\n12\nE7\nFF\n0E\n00\n0B\nF0\nF2\n02\n00\n0D\n15\nFD\n03\nF7\n0E\nEC\n0B\nDE\n45\nF2\n0B\nF6\n27\n2D\nFA\nF9\n03\n12\n06\nE5\n00\n31\nF0\n05\n07\n07\n20\nEC\nDC\nF9\n00\n06\n17\nE9\n1B\nF9\n0C\nE4\n0B\nF7\n50\nF9\n00\nE8\n24\n1C\nD8\nF2\n0C\n05\nFF\nEF\n23\n05\n1F\nCC\n1C\nF6\n2E\nD6\nC8\nE6\n00\n19\n11\nF5\n2F\n1D\n00\n2A\n0D\n20\n0D\nF9\nF4\nFB\n2A\nE8\n09\n0E\n07\n08\n04\nD3\nFD\nDE\nFC\nDE\n3F\nFD\nEF\nE8\nD5\nFC\n00\n0E\nF1\nF8\n11\n0E\n0C\n06\n0A\nFE\n12\nF3\n12\nF4\n0B\n0C\n1A\nF7\nEC\nF9\n10\nF2\nF2\n14\nE4\nFB\n24\nE3\n0B\nDC\nDC\nE7\n00\n0F\n03\nE1\n1F\n13\n10\nF4\nFD\n05\n2C\nEF\nFC\nE0\n03\n26\nF6\n12\n09\n0E\nFA\nF3\nED\n21\n1D\n0C\nF4\nD7\n32\nDA\nE0\n00\n00\n03\n10\nDC\n48\n0D\nFD\n00\nF9\nFF\n1E\nFD\nE8\nE8\n19\nFD\nF6\n11\n19\n05\n0D\nCB\n11\n06\n2C\n02\nEF\nDA\n28\nE5\nB4\n0B\n00\n05\n01\nCF\n1D\n24\n18\n1A\nF4\n1E\n21\nFD\nE9\n1D\nF0\nEE\nD1\n38\n08\nE8\n04\nC1\n04\nFA\n0A\n04\n11\nE7\n1C\nF5\n9C\nFE\n00\n04\nD6\nE9\n00\n0B\n09\n0F\nFD\n10\n33\n14\n0A\n24\nEC\n19\nF4\n15\n06\nFA\n11\nD2\n08\n01\n14\n06\nEA\nE2\n1C\nF0\nB2\nFF\n00\n05\nB1\n06\n0E\n09\nFF\nF0\nEE\n15\n12\n1C\nEF\n18\nFE\n05\nFA\n04\n05\nF5\nFF\nF4\n0C\nF9\n2B\nED\n13\nE2\n31\n0D\nDE\n05\n00\nFB\nBB\nF0\n08\n02\nF3\nE3\nFC\n29\n2A\n07\n02\n15\n16\n02\nF7\n11\n09\nE3\n0E\n05\n12\nED\n0B\nD8\n1F\nF0\n19\nFF\nEB\nEC\n00\nF3\nE5\nEA\n04\nFB\nF6\nF6\n26\n13\n1E\nF8\nFB\n24\n1A\nED\n0D\n12\nFE\nEE\n01\n00\nFA\nEA\n00\nFC\nF5\n11\n06\nF2\nF1\nED\n00\n08\nE8\nEB\n1C\n00\nFD\n18\n20\nFC\n0A\nDD\nD4\n1D\n2D\nE3\n00\n0B\n08\nE8\nF7\nF8\n06\nEC\n0A\n02\n07\nF1\n0F\n0E\nDE\nE7\n00\n06\nFE\n04\nF5\n01\n15\n0A\n20\nE7\n0B\nCA\nF1\nFD\n14\nF3\n06\n13\n0B\nDF\nF6\nEC\nEA\nF1\n16\nE4\n0D\n06\n0C\n20\n0C\nD9\n00\nE5\n0E\n07\nF7\nF5\n1B\nE4\n11\nDD\n19\nF3\n15\nDA\n18\n0D\n10\nFC\nE2\nE8\n0B\nFB\nF0\nED\n06\nF8\nF9\nEA\n14\n00\n0D\nBF\n00\n23\nF0\n12\nF7\n27\n02\nDF\nED\nFC\nF9\nF7\n0B\nE8\n09\n03\n10\n14\n10\nE3\nEE\n16\nFA\nFB\nED\n0B\n05\nF6\n05\nF1\n10\nD6\n00\n13\nFC\n16\n06\n1D\nF6\nE6\nF0\nFD\n02\nF8\n08\nF2\n19\nF8\n0C\n10\n0B\nF0\nE0\n0E\nEE\n10\nF9\n05\n15\n10\nFF\n01\n13\nFA\n00\nF8\n03\nF9\n1B\n3C\n0C\nF2\nFA\n25\n00\nE8\nF0\nEE\n09\nF4\nF1\n0A\nF1\n09\nE6\nFF\nFF\n1C\nE3\nFE\n18\nFC\n30\nF8\n1C\n15\n00\n22\n0D\n0E\n14\n04\n13\n04\n00\n03\n00\nEE\nEF\nEF\nF2\n09\nFA\n14\n0E\n20\nFF\nF4\n1A\n25\nE2\n12\nFF\nE9\nF5\nD9\nF9\nE1\n00\n00\n08\n1D\n09\nF8\n17\n03\n00\nF5\n00\n0E\n00\n00\n06\nF0\n09\nEB\nFE\n0D\n1D\nFE\nFE\nF1\nFB\nF7\nFE\nFF\nFD\nFA\n04\n0C\n00\n11\n00\n0A\nFE\n06\n03\n00\n00\n0F\n00\nE9\n00\n00\nF1\n18\nEC\nFD\nFD\n00\n11\n00\n00\nF7\nF5\nFA\n00\n03\n03\nF1\nF1\n06\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\nF4\n1A\n00\nFB\nF1\n00\n00\nFE\nFB\nE8\n06\nFE\n08\n0A\nE8\nF0\n06\n05\n00\nFF\n00\n00\n11\n1A\nEF\n0F\n0E\nF2\n14\nFE\n1A\n00\nF7\n03\n00\nFF\nF9\n06\nFF\n00\nFC\nFA\n02\n00\n01\n01\nFA\nFE\nFD\nFF\nF6\n05\n11\n13\n08\n09\nFC\nFE\n03\n09\n09\n00\nFE\n00\n09\nFB\nEF\nFF\n05\n12\n05\n05\nF5\n13\nF9\nF5\nFB\n0D\n16\n01\nF1\n04\nDF\n17\n17\n09\n0E\nFA\n04\nF7\n00\n15\n10\nF7\nEB\n00\n22\n01\nED\nF5\n16\n0B\n08\n0C\n07\nF7\nDA\nF0\n0C\n09\n2F\n13\nE8\n0E\n29\nFC\nE1\nF3\n17\nF6\n16\n01\nDC\n00\nFD\nE5\nF8\n00\n20\n2C\n11\n12\n09\nF9\n15\n06\n04\n07\nE5\nED\nE6\n20\nF5\nE0\nF3\n17\n0D\n2D\nF8\n0F\nFB\n11\nEA\n0D\nFD\nFC\n04\nE3\n03\n00\nFE\n0C\nF4\n1F\n11\nF9\nF5\n0B\n19\n0F\nF1\n0C\nE9\n0D\n0A\nE0\nEB\nF0\n0B\n20\nF0\n2E\nE7\n05\nC0\nFE\nF7\n0B\nF1\nD4\nFD\n00\n05\n1A\nE5\n07\n05\nFE\nE1\n18\n12\n0C\nCF\n01\nFE\nFD\n19\nCE\nF1\nF6\n09\n01\nEC\n34\n0D\n03\nD3\n17\nE5\n11\nF2\nC4\nFF\n00\n07\n06\nE1\n20\n16\n0E\nFB\n0E\n11\nF4\nFB\n09\n14\nF8\n01\nF9\n00\nEA\n0E\n14\nFE\n13\nF9\nEF\nF1\n2C\nF3\nFF\nEF\nA9\n0A\n00\n16\nFF\nEF\n2B\n12\n0C\nE9\n06\nF7\n05\nEA\nE3\n12\nF9\nE6\nFC\nEB\n1D\n05\n0C\n05\n00\n17\nFB\nE4\n07\n02\n18\nF0\nB4\n05\n00\n03\n0B\nF5\n45\n01\n06\nF2\nFB\nEF\n00\nF6\n0C\n0E\n08\nE6\nEF\n18\n06\nF5\n1E\n01\n09\nFE\n0B\nF4\nF3\nD7\n22\n03\nD5\n08\n00\n0B\n0C\nF3\n2F\n01\n10\nEE\nEC\n03\nE8\n01\n2A\n02\nEC\nF3\nE0\n01\n00\n01\n1C\nFC\n0C\nF3\nF8\nF6\nD4\nE0\n26\nFB\nD0\n12\n00\n0F\n10\nF9\n14\nFF\nF9\nF4\nED\n0C\nCC\nE4\n1E\n18\nF3\nF7\nE7\n15\nFF\nF2\n13\nFA\n03\n0A\nED\n05\nF2\nEC\n19\nF0\nCD\n0E\n00\n02\nF0\nF3\n15\n14\nFD\nFE\nEE\n0E\nE5\nED\n0D\n13\n08\nF3\n04\n0E\nFE\n00\n12\n0F\n09\nFD\n08\n00\n00\nF8\n1C\nDF\nD2\n01\n00\nF3\nEE\n02\n1C\n01\n05\n09\nE9\n10\nF2\nF8\nF9\n12\nFF\n06\n04\n08\nF5\n04\n0F\nFB\n0D\n09\n0C\nFF\nF9\nF2\n10\nF0\nEE\nF9\n00\nEA\nE3\n01\n19\n06\n00\nEE\nDD\n16\nFD\nEF\n03\n07\n04\n00\nF8\n0F\nED\nF5\n05\nF7\nFE\n0A\n0F\nEF\n18\n0A\n16\n09\nEA\n03\n00\nE8\nD3\nF6\n23\n0A\n0A\nE8\nE8\n19\nF2\nFA\nF8\n06\nFA\n0A\nFD\n0F\nF4\nFF\n17\n0B\nFC\n00\nFF\nE7\n0E\n14\n06\nE3\nFB\nFD\n00\nFC\nDA\nF1\n26\n03\n14\nF0\nF0\n09\nE8\nF8\nFF\n01\n08\n05\n04\n0D\nFC\n05\n16\n0C\n12\nFC\nFC\nF0\n0E\nF9\nFC\nEE\nFB\nFC\n00\n01\nF3\nF3\n11\n14\n0F\nF7\n03\n0C\nE0\nE9\n1E\nFC\n0B\n04\nF8\n05\nE2\nD7\n03\n06\n0A\nF9\n04\nFF\n27\nFE\nF4\n1D\nF4\nF2\n00\nE5\nEB\nF3\nF2\n0C\n0C\nF8\nFA\nFD\nFA\nED\n2A\nEE\n03\n17\nFC\n00\nEF\nDF\n06\n01\n00\nF5\n0C\nED\n1B\n05\nFB\n01\n0B\nE8\n00\nEB\n0C\n03\nE5\n17\n26\nEC\nF1\nF6\n0E\n08\n22\n0C\nF2\n17\n07\nF8\nF2\nDA\nDF\n19\n09\nFF\nEC\nEF\n1B\nFD\nFF\n0F\n26\nFF\n00\nE9\nDA\n02\n09\n10\n13\n06\nF1\nFE\n0C\n05\n17\nFE\nF1\n0F\nDF\n04\nE2\nF0\nF8\n1D\n0A\nF5\n0B\nF6\n24\n16\nFC\n08\n11\nFD\n00\nFC\n05\nFF\nF6\n37\n1F\nE1\nF2\nEF\n00\nF0\n2B\nF0\nFE\n05\nE8\nE4\nF2\n25\nF4\n13\nE9\nEE\nD7\n33\n10\n16\nDE\n17\n08\nCA\n00\n03\n0C\n1B\n0A\n37\n16\nD7\nFA\nDD\n00\n0E\n23\nB7\nF3\nF8\n0B\nC2\n04\n1F\n13\n0B\n0A\nE9\nC9\n26\n17\n07\n1B\n01\n26\nB9\n00\n0A\n08\n0E\n09\n36\n0C\nF6\n00\nF5\n00\n14\n17\nFC\nF6\nE7\n2A\nC9\nF5\n1A\n25\n38\nEA\nDA\nD4\n16\n15\n08\n29\nD2\n1D\nCF\n00\nF7\n00\n02\n0B\n13\n02\n00\n00\n1D\n00\n0D\nFC\n00\nE9\n07\n0B\nF7\n05\nEA\n0A\n08\nF6\nE7\nF2\nF5\n08\n08\n1E\nFC\n1C\n01\n00\n20\n00\n00\nF2\nFD\n00\n00\n00\nF9\n00\n00\n00\n00\nF6\n22\n07\n00\n00\n00\n00\n00\n00\n00\nF4\n19\nF7\nFA\nF3\n00\nF9\nDE\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n07\n06\n00\n00\n01\n04\n00\n00\nFF\nF8\nF7\nF6\n04\n09\nF7\n03\n11\n00\nFD\nF4\n00\n00\n01\n07\n01\n11\nFE\nFE\n03\nF4\n07\n00\nF3\nFF\nFA\n1B\nFA\n0E\nFB\n00\nFF\n00\n09\nFF\nF9\n07\n0D\n0B\nF2\nF6\nF8\nF8\n03\n16\n10\n04\n02\n01\n09\n11\nF9\nF2\nFC\n00\n1F\n14\n09\n27\n03\nEA\nF2\n05\nF8\n20\nE9\nE3\n0D\n25\n33\nEF\n03\n27\nE5\n0B\n0D\n0B\n2F\nF3\nF5\n21\n02\n18\nE7\nCE\n05\n00\n18\n1A\n1E\nE4\nEE\n08\nDE\n0C\nE5\nE2\nFF\n00\n11\n02\n0C\n1F\nF8\n11\n14\nFE\nE8\nFB\n17\n10\n07\n17\nDC\nD8\n1D\nF3\n05\n00\n0B\n20\n03\nF9\n04\nF9\nF4\nED\n11\nFA\nFB\nFD\n05\n04\nFA\nE7\n09\n1B\n09\n10\n00\n17\n04\n0D\nFF\n0B\nDF\nF2\n18\nDD\n07\n00\n06\n10\nFD\n07\n11\nF1\nF7\nEC\n0C\n0B\nE4\nEF\nD2\n09\nF5\nEC\n03\nE4\n01\n0B\n01\n1C\nFD\n0C\n04\n1A\nDC\n0B\n04\nF1\nF6\n00\n0E\n0B\n03\nE3\n0B\n01\nFA\n01\n01\nF8\n00\nF7\nEA\nF5\nEE\n02\n1C\nE1\n22\n19\n00\n0B\nF8\n05\nC7\n1E\nD6\nFA\n02\n0E\nFA\n00\n03\nFF\nFF\nE3\n04\n16\nE5\nFF\nE3\nFA\n13\n0A\nFD\nFB\n03\n0B\n0A\nF1\n08\n16\n05\nFD\nF5\nFD\nE8\n0A\nE1\nFE\n0C\nFA\nEA\n00\n07\n0A\nFD\n0E\n17\n08\nF5\nFF\nED\nFA\nF8\n05\n0B\nED\n04\nF3\n06\n03\n01\n17\nF8\nF4\nFD\nEF\n01\n09\nD0\nFA\nF6\nDE\nFD\n00\n09\n15\nF2\n0E\n04\n1B\n00\nFA\n04\nFF\n0F\nEB\n00\n06\nEC\n07\nFD\nEE\n07\n27\n0C\n13\nF0\nEB\nFF\nF7\nF8\n18\nFE\n06\nFA\n00\n09\n0B\nF2\n06\n0A\n08\nF6\nE9\n08\nF9\n00\nF4\n08\nEF\nE2\nFF\nEF\nF2\n0E\n24\n08\n09\n05\nF0\nFA\nF3\n03\n1C\nFE\n13\n00\n00\nFC\n01\nFD\nF7\nFC\nF5\n0B\nE9\n0F\n09\n07\nF3\n19\n0C\nE2\n00\n18\nFB\n06\n26\nFA\nFE\n11\nED\n05\nF8\nF8\n14\nF1\nFF\nF6\n00\n04\nF1\n03\nF7\n1A\nF7\n05\nED\n0D\nFB\n05\n03\n0A\n01\nF5\nFE\n0F\n00\n04\n0D\nF6\nFF\n0B\nFC\nFF\n03\nF9\n13\nF8\n04\n02\n00\n00\n04\n05\n01\n01\n00\n18\nF1\n0A\nF5\nFF\nF0\n07\n0E\nFD\nF9\n09\nF5\nF9\n0A\nF1\n0B\n15\n00\nFE\n04\nF6\n09\n02\nF4\n0F\n00\n1C\nDD\n0D\n05\n01\nFF\n06\nF2\nFE\nF7\n00\nF3\n09\n01\nFF\n04\n07\nF8\nF7\n1D\n02\n0C\n06\n09\nF5\n16\nF3\n12\nF9\nF7\n02\n00\n03\nCA\nFD\n07\n0A\n17\n00\nF1\n08\nF9\nFB\nF3\n08\nF5\n02\nF3\nFF\n04\n01\n0B\n04\n04\n0A\n02\n0D\nFA\nFF\n13\n01\n06\nFA\n00\nE8\nEE\nF5\n02\nF3\n23\n07\nEC\n01\nFA\nF4\nFF\n07\nF4\n0D\nF6\n0B\n0A\n0A\n13\nE7\n06\n08\nFD\n01\n02\nF1\nF3\nFA\n05\nFC\n00\nF5\nDE\nFC\n13\n05\n08\nEE\nDB\n17\nFF\nE6\n14\n0B\nE2\n0F\nFD\n11\n09\n00\n09\nE5\n13\n03\nFF\n01\n0F\n04\n02\nF1\nF0\n05\n00\n06\nD1\nFF\n3C\n14\nF3\nF3\nDD\n05\nF8\nED\n11\n01\nF5\n10\n07\n13\n11\nDC\n12\nFA\n02\nEF\n04\nFD\n01\n13\n0D\nE4\nE5\nFE\n00\nF4\n02\n12\n1C\n16\n15\n0A\nE5\nFA\nEA\nFE\nFD\n07\nFF\n02\nFE\nF5\n02\nEB\n02\nF5\nFE\nF5\n11\nEB\n14\nFC\nFC\n07\n09\n0B\n00\n09\nD1\n0A\n25\n1A\n0D\n07\nEA\nF3\n08\n00\nE6\n0C\nF4\nEF\n00\nFE\n0B\nED\n09\n09\nFB\nE5\n1F\nEC\n23\n07\nE9\n0D\n02\n0C\n00\n10\nF9\n03\nF2\n08\n03\nDB\nF7\nE9\nE6\nDB\nE9\n09\nF3\n0D\nFD\nF2\n03\n05\nF3\n0E\nF6\nE6\n11\n17\n17\nE9\nEE\nFD\nF2\n01\n00\nFB\n00\n05\nFB\n23\nFE\nD4\nF9\nF0\nF2\nDD\n09\nEA\nF4\n0D\nF3\nDC\nFF\n09\nDC\n0C\n02\nEF\nED\n21\n33\nFF\nF8\n15\n11\nF9\n00\n08\n0A\n37\n38\n35\nF3\n09\nF3\n18\nFE\nF5\nF6\nEC\nDE\n09\nFA\nDF\nFF\n21\n0E\n24\nF9\nC0\nE5\nF7\n2D\nE7\n2E\nFA\n1E\nFA\n00\n23\n03\n0E\n15\n19\n01\n0C\nF4\n11\n00\nFF\nEF\nEF\nE7\n13\nF0\nF5\n02\nF1\n00\nE0\nE4\nFC\nE3\n15\n22\nED\n17\nED\n03\nDC\n00\n23\n00\n00\nF0\nFF\n00\n00\nFA\nFF\n00\n00\n00\n00\nF3\n22\nFD\nFB\n00\n00\n00\n04\n00\n00\nF0\n1C\nF8\nF8\nF8\n07\n00\nE1\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\nF6\nFB\nFC\nF6\nFC\n16\nFC\nFE\nFB\n11\n0D\n0C\n01\n00\n03\n19\n03\nF8\nF6\n01\n17\nFE\n07\n00\n0A\nF5\nF4\n07\n10\n00\nE5\n00\n06\n06\n22\n0B\nE3\nF2\nF3\nFF\nFB\n0D\n03\nF9\nEA\n12\n0D\n0B\nF3\n19\n0E\nF5\nFD\n01\n2C\n0D\nFE\n16\n08\n17\nF8\n03\n16\n00\n13\nF0\n21\nF1\n0A\n06\nE1\nFD\n07\n15\n05\n17\nFD\n2D\n1A\nF9\nFE\n2F\n10\n09\n15\nFF\n1B\n06\n08\n23\n07\nFF\nE5\n02\n06\n00\n07\nEA\nFF\nCE\nFD\n18\nF2\nF5\nCE\nF5\n30\n26\n08\nF4\n0B\n14\n16\n06\n0E\n09\n01\n00\n18\n0E\n07\n08\nD6\nF3\n1B\n16\nE3\n00\n15\n23\nF6\nE6\nF8\nF6\n0D\nEE\nF0\nFC\n16\n07\n01\nF9\n09\nEE\n21\nF7\nFE\n10\n06\n0A\n07\n05\nF4\nFB\nD4\n06\n1B\nF6\nF5\n00\nF4\n07\nE0\n00\n0C\nFC\n12\nFA\nF2\n01\nF4\nF2\nEC\nF9\n02\nEB\n20\nF3\nFF\nFD\n02\n12\nFB\n09\nF4\n03\nE2\n0A\n1B\nF2\n02\n00\nF6\n03\n02\nF7\n17\n02\n05\n0C\nE9\nFF\nFF\nFB\nF2\nEE\nF9\nF6\n0F\nE4\n1F\n12\n03\n11\nF9\nF6\nFC\nFD\nED\n0C\n09\n0C\nFD\n00\nFF\n0C\n13\n06\n04\n02\n08\n17\nF0\n0E\nF8\nEB\nE2\nEF\n19\n03\n02\nEF\n13\n15\n07\n10\n06\n0D\nFA\nEE\nE4\n17\n04\n1C\nFF\n00\nEF\n02\n09\n06\n08\n02\n09\nFE\n00\n0A\n04\nDD\n02\nF6\nF6\n09\nFF\nF9\n06\n16\n04\n00\n00\n14\nFA\nFE\nE3\n0D\n0B\n06\nF9\n00\nF7\n07\nFF\n02\n0E\n10\n14\nE5\n06\n04\n09\nEB\n12\n08\nEF\n00\n03\n0F\n01\n16\n07\n07\n02\n07\nF2\n03\nF7\n04\n18\n08\nF7\n00\nF0\nFE\n01\nFC\n18\n02\n17\nE8\nFD\n03\n12\nFF\n07\nE3\nF0\n02\n10\n00\n09\n10\n02\n01\nF7\nF8\nF5\n04\n06\n08\n07\n0A\nFA\n00\nF0\n0F\nF8\nFC\nFF\nFD\n2F\nEB\nF9\n07\n07\nFF\n06\n06\nF3\n08\n11\nFE\nFB\n1B\n05\n0D\n06\nF3\n02\nFC\nEE\n05\n0D\nFD\nFE\n00\nF4\nF9\nED\n01\n02\nFF\n33\nFC\nF6\n05\n05\nF6\nFA\n00\nF9\nFD\n15\nF6\nF8\n12\n00\n09\n06\nFA\n02\nFC\nF7\n08\n04\n0E\n0E\n00\n01\nF6\nED\n08\n03\nFF\n1E\n14\n00\n1C\n0A\nE3\nFE\nD3\nFD\nFD\n1C\n09\nE7\n0A\nF9\n0A\n03\nFD\nFE\nFF\n02\n10\nF9\n0B\n04\n00\nFD\nF9\nF2\n05\nF3\n01\n0E\n0B\n0C\n13\n09\nEC\n00\nEA\nFD\nF8\n21\n02\nF3\n10\nF1\n0E\nFC\n0A\n04\n00\n01\n0C\n02\n03\n07\n00\nDF\nE8\nFA\n0E\nF7\n0C\nF4\n15\n10\n05\n0B\nFA\nF9\nEC\nF0\nFA\n18\n0B\n0A\n05\nF8\n0A\nF9\n00\n07\nF8\n06\n10\n05\n14\n03\n00\nE6\nF0\nFE\n0B\nEB\n0C\nF4\n11\nFD\nFB\n06\nFB\nF6\n03\nF3\n0D\n1D\n16\nF8\n14\n09\n09\n03\n00\nFF\nFB\n0C\n0B\nFD\n05\nF5\n00\nF3\nCC\nF9\n04\n06\n05\nF3\nF2\n0B\nE9\n08\nFF\nF8\nF5\nF8\n05\n0F\n08\nFA\n0B\n01\n07\n06\n05\n04\nFC\nFB\n07\n08\n04\nE6\n00\nEF\nDF\nF7\n0B\n00\n07\nEF\nE9\n07\nD5\n01\nF5\nFC\nFE\nFB\n0B\n1A\n01\nF4\n08\n03\n01\nE5\n00\n15\n01\n1B\n07\n0C\n0B\nED\n00\nE2\nF8\n1D\n0B\nF6\n04\nF3\nF3\n04\nE8\n14\nF9\n08\n03\n14\n04\n0B\nF4\nFF\n10\nF0\n0A\nF0\nFA\nFA\nFA\n08\nFA\n0B\n19\n0D\n00\nF8\nC0\nFC\n00\n12\nFD\n04\n07\n07\nEC\n12\nFF\nEE\nFF\n10\n11\nF1\nF1\nEB\nFF\nF3\n02\nD9\n1B\nF8\nF3\nEE\nE4\nFE\n05\nF9\n00\nF4\nE9\nE8\n12\n10\nF8\nEF\n00\n03\nD5\nFE\n02\n09\nEB\n14\n00\nD8\nF7\nF3\nF2\nE5\n0C\nDA\n07\nF6\n12\nEB\n07\nFF\n04\nEF\n00\n03\n0D\nF5\n03\n06\n1D\nEA\nFB\nE5\nDD\nF4\nD5\n0C\nFF\n01\n28\nD3\nFB\nD3\nE6\nF4\n19\nC9\n01\n24\n0D\n0C\n0A\nFF\n04\nF4\n00\n0F\n1E\n31\n1B\n24\n42\n0B\nF1\nFC\nF5\n00\nED\n00\nEE\nE7\n1B\n14\n06\nF3\nEF\n07\n07\nE1\nC9\n12\n21\n2C\n21\nCB\n08\n1C\n00\nFF\n05\n29\nFF\n19\n06\n0C\nFA\nF9\nFE\n0D\nEC\nE1\nFD\n02\n1C\nEF\n04\nD7\n0E\n19\n19\nE4\nEF\n0D\n10\n0B\n19\nFE\n00\n16\n00\n0A\n00\n00\nFE\n15\n00\n05\nFF\n19\nFE\nEF\nF8\nEF\nE8\n16\nE9\nFB\nF5\n00\n01\n09\n06\nF1\nF5\n0C\n14\nFF\n05\nEB\nE8\n01\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n10\n00\n10\n00\nF9\nFF\nFC\nFE\nFB\n00\n07\n02\n00\n00\n0A\nFB\n00\nFA\nF3\n06\n01\n03\n11\n0D\nF7\nFD\nF6\n07\n03\n06\nF6\n00\nFC\nFE\n04\nF0\nF9\n01\n07\nFE\nFB\n0E\n0B\n08\nF1\n00\n02\n11\n04\nFC\n07\n08\n17\n01\n06\nFF\n08\nF4\nEF\n00\n15\n12\nE8\n00\nFB\n25\n3A\nE4\nD4\nEB\nEE\n0A\n01\n02\n11\n0E\nEF\n01\n19\nF8\n18\n0B\n2A\n1E\nDB\n00\n2C\n21\n03\n0A\nEF\n06\nFF\n43\n24\n00\nF4\n02\n05\n0D\n0D\n06\nE9\nFD\n17\nFB\nFF\n07\nDE\n1F\n01\nDC\nF7\n20\n0F\nF6\n02\n00\n26\n11\n03\n25\nF5\n1D\nEC\nF6\n02\n00\n14\nEA\nF4\n05\n12\nFE\nFB\n04\nEB\nE7\n0D\n1C\n16\nE1\n14\nFF\nF9\nF8\n18\n0B\n0C\n12\n13\nEA\nE7\nF8\nF7\n00\nE2\nEE\n09\n00\nFB\n1B\n03\nED\nE7\nF1\n0D\n13\n08\n0E\n08\n0D\n17\nF1\n00\n03\n10\nFC\n06\n17\n02\n00\n0D\n0A\nE6\nEE\nDF\n0F\n06\nFC\nFC\n00\n05\nF0\n08\nFC\n08\n00\nFE\n03\nE1\n12\n0B\n17\n05\nF9\nFC\nF1\n0C\nF0\nF9\n09\nFD\nFD\n17\n17\nE5\n0D\nEC\nFE\n06\nF9\nED\n00\nFA\n09\n16\n0C\n12\nF5\n15\n00\nE9\n0A\nFF\n01\nF0\nD2\n00\n01\n06\nEF\n09\n13\n08\n01\n01\n07\nE8\nEB\n03\n14\nEF\n0B\n0C\n00\n00\nFB\n06\nF8\n11\n03\n10\n0C\nF7\n09\n0C\n05\n03\nCB\nF3\n14\n01\nF5\n0B\n03\nFA\n02\n0E\n16\nF1\nF5\nF8\n07\n06\n06\n04\n00\nF5\nED\nFD\nFC\n10\n0E\n22\nFB\n05\n05\n0E\nF9\n11\nE4\nE1\n17\nFE\nF6\nFF\n04\n02\n01\nFD\n0F\nF7\nFC\nEB\n0B\n09\nFB\nFE\n00\n05\nF0\nF4\n01\n05\n0B\n22\nEA\n07\n07\nFD\nF7\n17\nE2\n00\n01\n0B\n10\nFA\n11\nFE\n02\n05\n07\n00\nF2\nF6\n00\n0D\nFD\nF8\n00\nE8\n00\n04\nFD\n04\nFF\n0E\nFA\n03\n09\n00\nFF\n03\nEB\nF0\n11\n12\nEF\nF9\n0D\n00\n09\nFF\n01\n00\nFA\n14\n0A\n08\n07\nFB\n00\nED\n0D\nFF\n05\n04\nF9\n19\nFE\nFB\n16\n04\nF2\nFE\nF3\nEC\n0D\n12\nF7\n04\n0E\n05\n0C\n09\nF7\nFD\n00\n0A\n0A\nF7\n0E\nFA\n00\n08\n0C\nFC\n14\nFB\n04\n0A\n06\nE8\n12\nF1\nEB\n0D\nFB\nEC\n0D\n10\nF9\nF2\n12\n00\n0C\n12\n09\n0D\n00\n0E\nFC\nF6\n01\n06\n00\nF9\n0C\nE6\n15\n0B\n11\n0A\n1B\n04\n12\n08\nE7\n0E\nF0\nFD\n07\n29\nFE\nFF\n07\nF7\nFE\nFD\nFF\n0E\n06\n0E\n10\nE9\nFB\n03\n00\nE6\n03\nFA\n09\nF3\n0D\nF5\n13\nFF\n02\n16\nED\n0D\nF9\nF9\n0B\n2F\n06\n03\n09\nF8\n17\n04\n09\n01\n05\n07\n06\nF6\n02\n0D\n00\nEC\nE8\n04\nF2\nF3\nFD\nEF\n11\n0D\nF0\n18\n07\n06\nF4\n09\n0D\n2C\n05\n16\n10\n05\n0B\n05\n0E\n08\nF9\nFC\nFC\n05\nF5\n0D\n00\nEA\nEB\nFD\n0E\nFC\n07\nF2\n0B\n11\nF7\n12\n0B\nF9\n00\n07\n07\n35\n00\n09\n0E\n07\nFD\nFC\n05\n03\n08\n0D\n03\nF6\nF2\n05\n00\nE1\nD9\nF9\n02\n01\n05\nF5\n02\n18\nF5\n18\n09\n03\nF3\n15\n0D\n1C\nEF\nFD\n14\nFC\n00\n04\n11\n04\n05\n0F\nFD\n10\n02\nF8\n00\nE7\nCF\nF9\nFC\nF7\n0E\nF9\n02\n14\nD5\n01\nFA\n05\nF5\n04\n1A\n16\n02\nFE\n17\n14\n07\n02\n08\n0A\nFE\n20\nF1\n11\n0F\nF5\n00\nDE\nF4\n03\n0B\n00\n03\nEF\n03\n10\nE5\nF5\nF7\nFD\n01\n02\n07\n10\nFB\n0A\n0C\n05\nFC\nEC\n04\nF9\nFA\n1B\nF6\n02\n0A\nEE\n00\nF2\nDD\nFB\n1E\n08\nE8\nF3\nF5\n14\nC7\n0E\n08\nF5\nFA\n00\n07\n04\nEF\n09\n02\nFF\n0C\nDE\n21\n01\n0C\n18\nE9\nEE\n08\nE4\n00\nC7\nFA\nE4\n0B\nFE\nD1\nE7\n02\nFC\nBA\n24\n18\n08\n0F\n14\n17\nFA\nCE\nF4\nFA\nF3\nFF\nD1\n13\n0D\n01\n03\nE4\n14\nF9\nE9\n00\n02\n03\nDF\nF6\nED\n0D\nF1\n06\n04\nE2\nFC\nFF\n17\nEA\n29\n03\nE1\n01\n0B\nEF\n09\n18\nC5\nFD\n01\nF1\nF6\n00\n17\n14\nFB\n00\n23\n22\nFE\n00\nFB\n32\n08\nFC\n03\n07\nFC\nFA\nFD\nF4\nF2\n0C\nF1\n1B\n17\nFB\n1A\n1B\nE3\nB5\n03\n00\n0A\n0D\nD7\n05\n1B\n00\n07\n0F\n13\nF9\n2B\n07\n01\nEE\nEF\nF9\n02\nEA\nDC\n13\nFC\n39\nF8\nE2\nED\n04\nFF\nE3\nF1\nEF\nF9\n07\n22\n0F\n06\n06\nFF\n00\n0D\n00\n00\n00\n09\n00\n01\n00\n0F\nFF\nF5\nFE\nFB\nEE\n14\nEC\nFD\nFC\n00\n01\n02\n03\nF8\nF9\n03\n0C\nFF\n00\nF4\nEA\nFD\n00\n25\n00\nE1\n00\n26\n00\n00\n00\n0E\n00\n2A\n27\n00\n0A\n23\nD3\n29\nD0\n02\nFC\n00\n00\n00\n00\n09\n00\nD4\nD5\n00\nD6\nEB\n00\n02\n03\n05\n00\nFE\n02\nFF\n00\nFE\n00\n05\n04\nFF\n03\n01\n00\n00\n00\n00\n01\nFD\n00\nFE\n04\nFF\nFE\nFD\nFF\n00\n05\nFC\n00\nF8\n03\n04\nF8\nFA\nFF\n0C\n00\n05\n0A\n05\n18\n02\nE5\n0D\nFF\n13\nF8\n0F\nFE\n1D\n0A\n03\nF8\n13\nE7\nF6\nF0\n06\n15\nFA\n00\nE5\n07\nF9\n03\n08\nF6\nFC\nFC\n02\nED\n22\n01\nF6\nE9\n0E\nFA\nF3\nEC\n0E\nF9\n11\nFD\n13\n05\n05\n1A\nF5\n1B\nF0\n13\nF6\n00\nF9\n15\n03\n13\n0D\nFD\nDF\nFC\n11\n05\nF9\n11\nE0\n04\n04\nEE\nD5\nF6\n0B\n04\n02\nF3\n27\n0C\n0A\n1E\nF6\n24\nEC\nF1\nFC\n00\n15\nFC\n00\n0A\n0A\nFF\n08\n0B\nF1\nF9\nFA\n21\n05\nFB\n08\n00\nE8\nDB\n0C\n00\n02\n19\n04\nFF\nDF\n04\nFC\n1A\n03\nF6\n06\n00\n09\nEB\nF2\n0A\n04\nFF\n1A\n08\n0A\nFE\n0E\n07\nF9\n06\nF6\nF2\nF4\nE7\n12\nFB\n00\n08\nF0\nEB\nF5\nF9\n21\n1A\n0C\n0A\n05\n00\n01\nF9\nF5\nF7\n12\n03\n07\n05\nF5\n02\n0E\n05\nF8\nF3\nEF\n0A\nF4\nE3\n0A\nEF\n0E\nF4\n0D\n0C\nE6\n03\n20\n10\n06\n07\nFE\n00\nE8\nFF\nFD\nFF\n0B\n0A\n22\n04\nEF\n14\nFE\n09\nF2\nE1\nDF\n03\n02\nF6\n09\n04\n0A\n09\nFD\nFC\nEA\nF1\n14\n0F\n00\n12\n0B\n00\nF8\nF7\nFA\nF5\n13\n03\n22\n0C\nFF\n0D\n0F\n19\n07\nE3\nF6\nFC\n09\nF7\n15\n00\n05\n0A\n0F\n0D\nF5\nE8\nE4\n04\n0D\n03\n07\n00\n02\n09\nFF\n01\n0C\n08\n22\nF2\n04\n0A\n0F\n08\n05\nFF\nE0\nFF\nF9\nF1\n10\nF2\nFC\n0B\n15\n13\nEF\nFF\nE9\n02\n00\n07\n03\n00\nF1\nFF\n04\n07\n03\n0E\n1A\nF9\n07\n14\n00\nFA\nFD\nEC\nF2\n14\n01\n03\nF4\nEC\nF6\nFF\n03\n15\nF1\nF7\nFC\nFF\nFD\n1B\n03\n00\nF0\n05\n06\n04\n0A\nFF\n0F\n09\n07\n17\n0A\n03\n0B\nF5\nFB\n0C\n09\n00\nE9\nF7\nF3\nF9\nF1\n0F\nFE\nFE\n06\nFE\nF8\n03\nF6\n00\nE9\n10\nFF\n10\n0A\nF3\nFA\n0E\n06\n15\n03\nFC\n07\nEF\nFF\n0F\nFF\nFB\nEC\nFB\nFF\nFD\n07\n00\n0B\n00\n16\n07\nF7\n03\n05\n00\nF2\n1F\n05\n06\n04\nF2\n0E\n07\n04\n15\n13\nF4\n18\n05\nF5\n15\n10\nFB\nFB\n17\n01\nFD\nFE\n13\n13\nFD\n0D\nFC\nEA\nFC\n12\n00\nF7\n15\nF9\nFB\nFF\nFF\nFA\n0D\n08\n08\n1B\nFB\n0C\n09\n06\n17\n1D\nF9\n03\n1C\n00\n0B\n10\n10\n0E\n09\nFB\n05\nF6\nF2\n01\n00\nE3\nFC\nFA\n04\nF1\nF3\nF6\nFF\n0A\nF9\n23\n03\n00\n0A\n0B\n1C\n2C\n03\n00\n10\n0A\n04\n09\n02\n09\nFE\nF6\n0C\nF7\nFE\n03\n00\nF3\nF4\n06\nFC\nF8\nE5\nFF\n04\n12\nF5\n14\n0D\nFD\n0C\nF4\n1A\n26\n08\n04\n06\n08\nFA\n0C\n14\n00\n01\nF0\nF8\nFD\nF1\n0F\n00\nEB\nF1\nEB\nFA\nF7\nF9\nFA\n01\n0D\n00\n25\n0F\nFC\n0C\nFF\n16\n1A\n00\n09\n12\n02\n07\nFC\n0C\nFD\nF8\n07\n12\n09\n06\n02\n00\nF2\nDB\n0E\n00\nF8\nE2\nFE\nFC\n1E\n09\n06\nF8\nFA\nFB\n02\n12\n0A\n05\nFF\n07\nFE\n00\n12\n13\nE6\n09\n19\n13\n12\nFB\n01\n00\n0C\nBF\nF8\nFA\n02\nE6\nFF\n08\n0D\nFB\n09\nF3\n0B\n07\n06\n28\n0F\n04\nF9\n0C\n06\nF5\nEF\n0C\nEE\n0C\nF7\n01\n01\nF9\nF6\n00\nEF\n0A\nF7\nFB\nFC\nF1\nF7\n0B\n0F\nF5\nF1\n06\n0D\n0A\n13\n0B\n12\nF7\nFC\nFF\nF1\n05\nDE\n02\nFB\nF4\n07\n07\n03\n07\nF3\n00\nF5\nFC\n06\n06\nEF\nEA\nEA\nF7\n04\n03\n0B\n04\nFE\n09\nF2\n05\n04\nF8\nDD\n10\n0A\n0E\nC8\n19\nF6\n00\nFE\nFD\n0C\n14\nED\n00\nEC\nF7\n06\n1C\n10\nBF\nFD\nFB\n0A\nD4\n0F\n03\nFF\n04\nDF\n09\n0E\nFB\nF8\n10\n0B\nF7\nD9\n07\nDC\n00\n11\nEE\nE8\n03\nCC\n00\n05\nF0\nE5\nFF\n07\nDA\nF4\n06\nEE\nD5\n1C\n00\n14\n0F\n06\n24\nD6\n12\nF6\nF9\n23\nFA\nD5\nCE\n20\nF0\n1E\nEF\n03\n09\nE8\n00\n22\nFF\nF3\n0C\n1C\nDD\n22\nFE\nFC\nE0\n2C\n31\n15\nF0\n00\n31\n04\n06\n02\n07\n25\nE9\nFE\nB4\n18\nF3\n14\nF9\n0E\n08\n13\n00\n06\n12\nEF\n2D\n16\nE7\nFC\nFC\n02\nEE\nFC\n01\nF2\nE1\n14\n3A\n02\n0F\n0D\nFC\nEE\nE7\n0B\nFE\nF3\n21\n26\n19\n07\n22\n10\n00\n02\nFC\n00\n03\n01\n00\n01\n00\nFE\n00\n01\nFF\nFE\n04\n00\n01\n00\n00\nFD\n00\n03\n00\n00\n00\n03\n00\n00\n00\nFE\nFF\nFA\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n04\n03\n09\n00\nF8\n02\nFF\n00\nFD\n00\n12\n04\nFF\n03\n02\n00\n00\nEE\n04\n01\nFD\n00\n00\n04\nFB\nF5\n00\nFC\n05\n15\nF6\n00\n00\n1D\n03\n18\nF6\nF0\n0A\nF4\nF5\n1E\nF4\nF5\nF1\nEE\n05\n07\nE5\nFF\nE9\n0E\n2C\nDA\nFF\nFF\nFE\nF4\nFD\n05\nF0\nE6\nED\n00\nDB\n18\nEE\n00\nFD\n04\nFE\nF7\n23\n02\n22\nF1\n06\nE4\n11\nF8\nDE\n09\nFE\nF6\n05\nF0\n14\n16\nEF\n1A\nE9\n30\nFE\n03\n12\n00\nFC\n0D\n18\nF9\nFE\n1C\n04\nF4\nFE\n24\nFF\n2B\n0E\n02\nF8\n1B\nFE\nE0\n06\nFA\nF6\nFE\n0E\nFE\nFD\n25\nE9\n08\n07\nE5\nED\n00\n0B\nFC\n24\nFE\n00\nE7\n0D\n05\nFC\nFD\nF0\n1C\nF8\n15\n04\nE9\n06\nC9\n0E\n06\n07\n12\n20\nF4\nD7\n10\nE9\n0D\nF7\n02\n0E\n00\nF3\nE9\n0E\nFE\nFE\nF6\n15\nFF\n09\nF5\n0B\n0A\n04\n07\nFC\nEC\nE6\nDB\n0A\nF2\n15\n0E\n18\n0D\nE7\nFD\n02\n17\n21\n1C\nF1\n00\nFF\nF8\n18\nF2\n05\nFB\n1F\nFE\nF1\n05\n04\n05\n19\nF6\nFC\nF4\nEA\nF2\nFE\nED\n0D\nFD\n1A\n19\nF2\n0A\nF2\n04\n24\nF8\nF3\n00\n01\nE7\n0D\nFE\n0A\n0C\n09\n07\nF6\n19\n01\n0F\nFB\nF8\nE2\nFD\n08\nF3\n07\nEE\n04\n10\nF7\n15\n00\n06\nF6\n0F\n1C\n04\nF8\n00\nEB\nF7\nFF\n05\n03\n06\n0D\n05\n08\n14\nF8\n0E\n09\n02\n04\nFD\nF9\nFD\n07\nF2\n0A\n02\nF3\n0F\nFB\nF0\nF4\n0A\n10\n04\n04\n00\nEB\n0A\n05\n0D\nF8\nFF\n1B\nFB\n0F\n0E\n0E\nFE\n12\n0A\n05\n08\nFB\n07\n0B\nED\n09\n00\nDE\n13\nF4\nF9\nFF\n02\n03\n01\n0B\n00\nF6\n08\n09\n09\n05\n1C\n10\nFF\nF8\n0D\n04\n06\n09\nFE\nFD\n0B\nEC\n07\nF1\nDC\n03\n05\nE7\n0B\n02\nF9\n01\nF9\nFE\n03\n05\n00\nF2\n0D\n11\nFA\n04\n0E\n03\n03\nF9\n1B\n18\nFE\n02\n0D\n02\n03\nFC\n0B\nE6\nE9\n03\n00\nEA\n12\nF4\nF5\n04\nFA\nFD\n0A\n0E\n00\nE6\n15\n1D\n02\n02\nF4\n02\n09\n0D\n0D\n22\nF7\n17\n0D\n04\n05\nF8\n04\nF0\nF2\n05\n03\nFC\nEA\n00\n05\n1B\nFB\n02\nF8\n03\n00\nF5\n24\n12\nF1\n08\nF0\nFF\nF1\n04\n0E\n17\nF4\n0A\n16\nFA\n19\n00\nF8\nFA\nF0\n00\n05\n12\nF1\n0A\n15\n11\n05\nFC\nFA\n02\n00\nF3\n15\n10\nF1\nFE\nF4\n01\nEB\n0A\nEF\n07\nFC\nFB\n1F\nF8\n1B\n0D\nFE\nFC\nFC\nFE\nFD\n19\n02\nFD\nF4\n0C\nFE\n0D\n01\n17\n00\nFD\nF9\nFF\n00\nFD\nF0\n0F\nE9\nFD\nE9\n10\n0D\nE2\n22\nF0\n0C\nFC\nFF\nF8\nFA\nFD\nFC\n11\n08\nFD\nF7\nF5\n00\n0E\nF9\n1C\n00\nF1\n04\n0E\nFD\nF9\nD9\n0B\nFE\nFB\nFC\n0E\n11\nED\n23\nF6\n20\nF6\n06\nFF\n00\nFC\nFD\n07\n0B\n00\nF8\nD5\n0F\n1C\n07\n16\n00\nEE\nE8\n01\nF2\nFB\nDC\n0C\nF8\nFA\n00\n0A\n19\nFB\n11\nF3\n20\nFA\n05\n07\n11\n00\nFB\nF6\n0B\nF7\nF2\nF6\n01\n10\n07\n16\n00\nFD\nCB\n01\nF8\nFA\nCE\nF5\n0B\n06\n01\nF5\n08\nFF\n17\n05\n10\n00\nFB\n12\n0D\n05\nE9\n0D\nFD\nEE\nF2\nFA\n18\n19\nFD\nF1\n00\n04\nD5\nFA\nEF\nF8\nD2\nED\n07\n21\n03\n04\n15\n11\n13\n23\n04\n0A\nFB\n05\n0B\n09\nFA\nE5\n00\nE7\nF3\nE1\n1C\n06\n08\nE6\n00\n0D\nFB\nFC\nEF\n0D\nD2\nEF\n06\n1A\nF2\n07\n0D\n0A\n02\n04\n0B\n04\nEC\nFF\nF8\nF9\nFB\nC9\nF6\nE6\nF0\nFD\n10\nFA\n17\nF2\n00\n0C\nF7\n0C\nFE\nF1\nD0\nE7\n06\n06\nF4\n08\n06\nFB\n16\nE8\n11\n05\nF5\nD5\n12\n05\n1D\nCA\n0D\nE9\nFF\n00\n04\n11\n18\nF3\n00\nFC\nDB\n0C\n1F\n05\nE2\nEF\nFE\n0C\nE8\n10\n14\n0E\n08\nF5\nFF\n03\nDB\nF1\n0A\nFB\n06\nDA\n06\nEF\n1C\nFA\n0B\nFF\n10\nEF\n00\nFD\n01\nF8\n0C\n24\nE1\n13\n16\nF8\nDC\n21\n08\n04\n14\nFB\n1B\nD0\nD8\nF1\nDE\n07\n10\nDA\nD0\n34\n01\n32\nF9\n03\n14\nF9\n00\n03\n08\nFF\n36\n3E\nEC\n20\n06\n04\nE6\n4C\n20\n1B\nF2\nEC\n32\n0A\nC0\nD9\n1B\n12\n10\nEE\nE6\nF8\n15\n29\n1A\nFE\n12\n0E\n00\n1E\n1E\nEA\n2A\n16\n08\nF2\n00\nF4\n0E\n37\nED\nCC\nFC\nE4\n06\nF1\n09\nF5\n15\n01\n01\nDD\n26\nE5\n20\n0B\n1F\nED\n25\nF7\n00\n1F\n23\n00\nFA\nE4\n00\n00\n00\nDD\n17\n0D\n02\n00\n1A\nFE\n01\n02\n0A\n00\n00\nFD\n00\nD5\n27\nE8\nFA\nE9\nE8\n08\n18\nFB\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n02\n03\n05\n00\nFE\n02\n00\n00\nFD\n00\n05\n03\n00\n03\nFD\n00\n00\n00\n00\n00\nFD\n00\n00\n02\nFF\nFE\n00\nFD\n01\n04\nFD\n00\n1A\nFC\n01\n09\nEF\nE8\n1F\nF4\nEF\n07\n18\n05\nF3\n0A\nF8\n09\nEE\n0E\nF3\n0C\n1B\nBD\nF2\nF7\nE8\nF4\nEF\nE7\n01\nF5\n09\n00\nE7\n13\nF4\nF2\nF2\nFD\n0F\nE6\n07\n1B\n09\nF0\n0C\nDA\n18\nF2\nE7\n0A\nF2\n0D\n31\n0B\n08\n06\n01\n0E\nFB\n2A\nFF\nFA\n18\n00\nDA\nFE\n11\nF5\n0E\n11\nE5\nD6\n05\n0C\n19\n1B\n11\nF6\nDA\n16\n07\n00\nF3\nDB\nFA\n04\nED\nFA\n22\n16\nF6\n01\n02\nFC\nFD\n00\nF9\nF9\n20\nFE\n07\nFA\n15\nE6\n20\n12\nEE\n13\n08\nF9\nF1\nEE\n0E\nF0\n12\nF3\nFC\n11\nFC\nEC\nEA\n06\nE4\nFB\nE2\n14\n04\n00\nE9\n05\n10\nF4\nFD\n04\n29\n00\n0D\n1F\n0C\nF7\n0D\n17\nF5\nFE\nF1\nF3\n0F\nEA\n07\nFE\nF6\n0E\nD2\n01\nEB\n0B\nFD\n1D\nF7\n00\n03\n10\n0A\nF0\n01\nFA\n0D\n04\nFB\n13\n05\n08\n11\nFC\n00\nFF\nED\nEC\n11\nE3\n0C\n0F\nF3\n0B\nE9\nF5\nE2\n14\nFA\n0A\n00\n00\n04\nF8\n11\n06\n0C\nF9\n0C\n01\n00\n0D\n05\n11\nF5\n04\nE4\nFB\nF5\nEA\n0A\nF1\n0B\n19\nC0\n19\n04\n06\n0A\n0D\nF6\n13\n0A\n00\nF2\nFE\n07\nFD\nFB\n0F\n11\nFD\nFA\n0E\n0F\n09\n07\n06\n0A\n04\nE7\nF5\n07\nEA\nFD\nFD\nCF\n07\nF8\nF5\nF6\n04\nF4\n19\n05\n00\nED\n16\n15\n01\n02\n0A\n08\n05\nFB\n02\n16\n0C\nFA\n0B\n02\n11\nF1\nFE\nFC\nE2\n06\nFD\nE2\nFD\nF2\n12\n08\n0C\nED\n07\n07\n00\nF6\n0A\n20\n00\n05\n0B\nFF\n02\nFA\n06\n11\n13\nFF\n15\n08\nF4\nF2\n05\nFC\nE6\n00\n06\nEA\nF1\n05\n0E\nF7\nFD\nFD\n08\n06\n00\nF8\nFF\n1C\n02\n0F\n0E\nF1\n01\nFA\n03\n09\n0E\n07\n06\n0C\nF4\nDF\n16\nE7\nE1\n07\n0A\nEC\nE0\n06\nF8\n0D\nF9\nFA\n08\n09\n00\nED\n15\n34\nE9\nFB\nF2\nFA\nFB\nF5\n02\n1E\nF6\n0E\n1C\n0A\n02\nE8\n03\nF1\nE9\nF6\nFC\n0E\nCE\n04\n08\n13\nF4\nF3\nFE\nF7\n00\nEF\n25\n10\nEC\n09\nDD\n03\nFC\n0C\nEE\n14\nE6\nF4\n1B\nF6\nF9\nF7\nFC\nF3\nF6\nF9\n11\n14\nD9\n0C\nF1\n0D\n00\nEA\nFB\nFE\n00\n0F\n0A\n09\nF7\n09\nFB\n07\nFC\nF7\nDC\n12\nF9\nF8\n24\nF4\nFC\nF8\nF8\nFA\nE4\nFC\n01\n14\nFE\n02\nEF\n0A\nF1\nFD\nF4\n13\n00\n0C\n03\n00\n05\nEE\nFB\n24\nF8\nE5\nFF\n12\n0D\nEF\n27\nF4\nF1\nF1\nF8\n01\nF7\nE2\n06\n12\n0A\nF8\nE9\nF1\nFD\n0D\n04\n22\n00\n05\nF0\n08\nF7\nF7\nE9\n11\nF2\nEF\nFC\n10\n1A\n00\n13\nFC\nE4\nEA\nF1\n03\n00\nF3\nFF\n05\n0E\nFE\n08\nDF\n03\n10\nF2\n20\n00\nF4\nE6\nFC\n0B\nFB\nEA\n0D\nEC\nFF\n03\n08\n1B\n00\n18\nF8\nE4\n02\nEF\n10\n06\nF5\nFF\nF3\n03\nFE\nFF\nED\n14\n0C\nFB\n15\n00\nF6\nDA\n0C\n00\nF8\nDE\nF2\n08\nFB\n04\nF6\n1D\n0B\n15\n01\nE9\nF9\nF5\n12\n07\nFD\n02\nF9\n00\nF2\nF3\nF4\n09\n15\nFF\nF4\n00\nF5\nD5\n0C\n03\n06\nF2\nF4\n03\n00\nFE\n0A\n12\n0E\n12\n01\nE9\nF2\nF1\n0C\nF4\n04\nFF\nDC\nFF\nF9\n03\nDD\n11\n0F\n09\nC5\n00\n00\nF6\n0E\nF4\n09\nF3\n0F\nF9\n0C\nFD\n05\n08\n12\n12\nF3\nFF\nF3\nF3\nEB\nF1\n06\nF8\nC8\nEE\nFC\nFE\n00\nFD\nFC\n07\nEA\n00\nFB\nFA\n0F\n0E\n04\nE6\n00\nF5\n14\nE5\n14\n19\n1F\n0C\n07\nEB\nF3\nE7\nD6\n12\nFB\nF9\nE7\nF6\n03\n02\nF5\n00\n19\n13\nF8\n00\n04\nFB\nEF\n1E\n14\nE3\nFF\n08\n13\n03\n01\nF4\n15\n1E\nF9\nE5\nF5\nDE\nE7\nE4\nED\nF9\nF6\nF0\n00\n13\nFF\n1C\nFB\nFB\nF9\n00\n13\nE7\nEB\n15\n27\n07\n00\n15\nE8\nDE\n09\nEE\nFD\n08\nF6\nF3\nD5\nE9\nDE\nC4\nF3\n1D\nD0\nDE\n1F\n17\n1A\n03\nFD\n15\nF9\n00\n11\nFC\nFA\n19\nF9\n3A\nF0\nF5\nDD\n06\nFE\n11\n04\n1E\n04\nF2\nDE\nF1\nF0\n10\n15\n1B\n00\n19\nFE\nF4\n2F\nDF\n19\n00\n00\n00\n06\n20\n18\n1B\n11\nF9\n01\n01\nFC\nFF\n24\nF3\nE3\n08\nD7\n06\n08\n00\nEF\n23\n1C\nF3\nF8\n23\nEC\n03\n04\n05\nEA\n09\n20\n00\nF8\n1D\n00\n00\nF5\n00\nFC\n03\n09\n04\nFE\n00\n00\nE9\n00\n03\n06\nFE\n00\n01\n01\n00\n05\n20\nD6\n01\n03\n03\n1B\n20\n28\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n31\n09\n05\n00\n22\n00\n00\n00\n0A\n15\n2A\n29\n00\n01\n13\nDB\n26\nD5\n04\n00\nFE\nFB\n00\n17\n00\n00\nE5\nD5\nF6\nD7\n03\n00\n02\n01\n00\nD2\nEE\n3D\n04\nFA\nE3\n05\n1D\n26\n0D\n13\nE6\n1F\n04\nFE\n0D\n01\nF5\nCF\nE3\nF5\nEB\nEE\n0F\nF2\n46\n2F\n0A\n00\n07\n0B\n0B\nF4\n07\nF0\nFD\nF2\n03\n0A\n29\n15\nEE\n06\n0F\nD9\n04\n06\nF3\nD1\nF2\n09\nF9\nEC\nF1\nF3\n07\n24\n14\n0A\n11\n00\nF6\n17\n20\n21\n0B\nFD\nE1\nE6\n0A\n12\n01\nFE\nEE\n19\nCC\nEF\nF7\nF8\nF5\nD2\nF1\n18\nEF\nF1\n0D\n24\n0C\n17\n06\n0B\nFC\n00\nF9\n0A\n25\nFB\n03\n04\n0A\nE5\n1D\n11\nEA\n0E\nFB\nE8\nD5\n04\nED\n0B\n0A\nDA\n02\n08\nDB\nF7\n10\n13\nF1\n0D\nFD\n1C\nFE\n00\nEF\nFF\n09\nFD\n0D\n0D\n19\n06\n0E\n17\n05\n0A\nF5\nF9\nFB\n06\nEC\n09\n12\nDF\n08\nFE\nC8\nFD\nF4\n13\nF2\n05\nF0\n07\nEF\n00\nF1\n09\nFE\nFC\n02\nFC\n0E\n0C\n1E\n04\nFB\n03\nFA\n13\n04\nEF\nFE\nF7\n15\nEC\nFF\n14\nCF\nEE\n00\n12\nE8\n06\nFB\n14\n15\n00\n00\nFF\n04\nE6\nF7\n06\nFC\n06\n05\n01\nF8\nFF\nF9\n15\n09\nF5\nF7\nFC\n16\nF2\n00\n18\nDE\nE3\nF7\n0D\nFC\n11\nFA\n2A\n09\n00\nFE\n02\n13\nE8\n0F\n1C\nFC\nFA\nFA\n0A\n07\n08\n15\nF4\n08\nF3\nF6\n01\n07\nDE\n04\nF4\nEB\nD5\nF1\n06\nEB\n0B\nF2\n2C\nFF\n00\nF7\n07\n0F\nE5\nF9\n0D\nF9\nFC\nFD\nFD\n05\n09\nF0\n08\n0E\nFC\nF0\nF6\nFF\nF3\nF9\n07\n00\nC6\nF5\n0A\nFF\n03\nFC\n1B\n08\n00\nF5\n02\n26\nEC\nFC\n01\nFC\n03\n00\nF7\n00\n15\nF3\n1A\n12\nEE\nF6\nFD\n11\nEF\nEE\nFD\n05\nCB\nF4\n0E\nFF\nFD\n03\n19\n09\n00\nF8\nF4\n1A\nFA\n0B\n14\nED\nFD\nF9\nEF\n06\n0A\nF1\n00\n05\nED\nF0\n0A\n0C\nF5\nF7\n07\n13\nBA\n01\nE9\nF7\nFE\nF8\n0F\nFD\n00\nFF\n12\n0C\n01\n04\nFA\nF9\nEE\nF5\nD7\n0D\nEA\nFC\n09\nE7\nDF\nF9\nFE\nFD\nF7\nF2\n09\n19\nD8\n14\nEF\n02\n07\nF5\n03\nEF\n00\n0B\n2C\nFD\nFA\n06\nFF\nF5\nFE\n12\nE3\n0B\nD4\nEE\n17\nEF\nE0\nEA\nF5\n0D\nE8\nFE\n13\n1D\nFD\n05\nF4\n0A\n13\nFB\n04\nF3\n00\n0A\n0A\n05\n08\nF9\n10\nFC\n01\nF2\nF3\n0C\nF9\nF5\n11\nF9\nEC\nDB\nE4\n02\nE1\nFB\n0B\n11\n0F\nF2\nF6\n04\n02\nFD\nF7\n0D\n00\n05\nF3\nFD\nFF\nF8\n18\n15\n02\nEF\n10\n09\n0C\nF9\n07\nFD\nE0\nE5\nF7\nF5\nED\n05\n06\nF5\nFF\n00\nFB\n09\n0A\n03\nF8\n2E\n00\nF0\n04\nF8\nF3\nEE\n0B\n0B\nEE\nED\n12\n19\n0C\nF8\n12\n0E\nDD\nF3\nEF\nFC\nFB\nF4\n07\nE9\nFF\n10\n02\nEB\n16\n15\nF3\n21\n00\nFB\n07\n07\n02\nEB\n08\n0A\nE3\nF7\n15\n04\n14\nF6\n0E\nFC\nCC\nFD\nEB\n08\n0E\nF8\n0F\nED\nFC\n10\nFC\nFD\n12\n0F\nF2\n16\n00\nF5\nF6\nFF\n01\nF9\nF9\nFF\nFE\n08\n08\nF8\n0D\nFC\n0F\n02\nBC\nF4\n07\n27\n06\nE6\nFF\nF5\n0E\n03\nFD\nE5\nFF\n06\n06\nF8\n00\nF2\nEA\n02\nEF\nE9\n08\nF8\nF3\n14\n1D\nF7\n01\n11\n1F\nEC\nB3\n0A\n00\n20\nF8\nF0\n0D\nF8\n0B\nF4\n05\nF4\n01\n14\n0C\nEC\n00\nF1\nE0\nF8\n0B\nF7\n06\n07\nF5\n0E\n0C\nF8\nFE\n19\n0E\nFE\nC1\n02\n01\n01\nE4\nEF\nFD\nD9\n03\n01\n07\n0F\nF6\n05\n09\n00\n00\nF6\n0F\nF9\nF1\nF4\n01\nF6\n00\n15\nFD\n0D\nFD\n1E\n18\nFC\nD0\n00\nFE\nEE\nFE\n02\nFE\nF7\nFF\nFE\nF4\nF9\n06\n12\n19\nF0\n00\nF2\n02\n07\nD7\n0C\nF9\n05\n07\nFF\n0F\n13\nEE\n1A\n18\nE8\nDD\n05\nFA\nE7\nFC\nF3\nEF\n0E\n03\nEF\n08\n17\n05\nFB\nFC\nCE\n00\nF2\nF5\nF2\nCC\n22\nEF\n1A\n03\nF4\nF5\n1F\nE8\n0D\n2C\nDD\nB1\nED\nE6\nD2\nF3\nEC\nFF\nCE\nFB\n00\nE9\n21\n12\nF3\nF9\nEE\n00\nFA\nFB\nFB\n06\n27\nC5\nF7\nF5\nF8\n15\nE6\nEB\nE9\n10\nEA\nDA\nC6\nFD\nEC\nF3\n1E\n09\nDE\nF8\n06\nED\n1B\n17\nE0\nEF\n03\n00\nD0\nE6\n27\nFC\n3E\nE0\n04\nFD\n12\nD7\n3F\n15\n00\n18\nC1\n12\n02\nC6\nEF\n04\n20\nFB\nDB\nD2\n32\n05\n1F\n2D\nFA\nF8\n00\n00\n0B\n17\n02\nFD\nED\n12\nFB\n03\nF2\nFE\nFB\n00\n06\n20\nF8\n02\n02\nE5\n00\nFC\nF1\n00\n08\n03\nF3\n01\nF5\nF3\n0F\n06\n04\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n01\n00\n00\n00\n00\n00\n00\n00\n00\n00\n01\n00\n00\n00\n00\n00\n00\n01\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n03\nF8\nF2\nE5\nEF\n12\nFE\nFD\n03\n08\nF7\n08\n03\n07\nFF\n03\nE7\n14\n1B\n00\n11\n06\nFA\nE9\n14\nFE\n13\n00\n2C\n22\nFE\n00\n14\n0E\nFA\n17\n22\nF4\n13\n00\n0C\n0D\n24\n0C\nE6\n16\nED\nF5\nF3\n03\nFC\nCA\nE3\nEA\nEF\nD7\nC7\nEF\n00\n18\n03\n06\n0C\n00\nEA\n22\nFA\n13\nFB\n02\nEB\nE8\n25\n1D\nF0\nDD\nFF\n20\nE2\nEE\nF2\n03\nFC\nE0\nFD\n0B\nD5\nE1\n06\n0C\n29\n16\n0A\n17\n0C\n00\nEF\n15\n0C\nE2\nEE\n06\nEF\nF8\n1B\n08\n05\n09\n1E\nF3\n01\n00\nEA\nF9\n0D\nED\n05\n04\nC8\nDB\n06\n05\nFB\n16\nEB\n13\nF8\n00\nE0\nF1\nF0\nFE\nF9\n12\n03\n10\n0E\nFE\n0B\n14\n18\n05\n13\nFD\nFE\nFE\nF5\n07\n14\nF5\nC2\nD1\nF2\n08\nF2\n03\nF2\nFF\nF2\n00\nF5\nF7\n07\nFD\n0C\n08\nFF\n10\n0E\nEF\nFF\n08\nFE\n1D\n05\nF2\nF7\nF4\nF7\nFE\n02\nFC\nE7\nC5\nF1\n24\nFD\nFA\n00\n0C\n0A\n00\n05\nF5\n10\nF9\n0C\n1D\nFD\nF8\n03\nF4\nF9\n0A\n0F\nFB\n17\n02\n03\nF5\n08\nF9\nF8\n00\nF4\nB0\nF9\n18\n0E\nFF\nFB\n1A\nFB\n00\nF8\n02\n0A\n08\n14\n11\nF3\nFD\n0E\nEA\nFC\nFE\n2D\n0A\n15\nEF\n13\n0C\nFC\nF5\n01\n02\n0D\nB3\nFC\n07\nF9\nF8\nEA\n0F\n07\n00\n07\nE6\n02\nFE\n0D\nFC\nDE\nFB\nF5\nE5\nFB\n1A\nF9\n0C\n08\n01\n00\nF7\n08\n0B\n0C\n11\n12\nCB\n0A\nFE\n02\nF6\nF5\n13\n08\n00\n05\nEC\nF1\n12\n0B\n06\nFE\nFE\nF2\nED\nF6\n27\nF2\nFD\n06\nF7\n03\nF7\nFE\nF7\nFA\n11\n13\nD0\n14\nF6\n0A\nF2\n02\n03\nFB\n00\n0D\nFD\nFE\n09\n0D\nF2\n03\nF8\nE6\nD8\n11\n19\nFF\nF0\n02\nF5\nF7\nF0\nF5\n12\n01\nFC\n1D\nF2\n13\nE4\nFB\nEC\n00\nF2\n01\n00\n15\n12\nF1\n07\n0B\nED\nFA\nFE\nF6\nE6\n1A\nE7\nF5\nFD\nF0\nF8\nE3\nFA\nF0\n01\n04\n03\n1B\nEF\n1A\nDB\n0D\n02\n0E\nF9\n04\n00\n1A\n21\nE7\n17\nFE\n0B\nF8\n06\nF0\n0B\nF6\nD0\nEF\n12\nFD\nEC\nE9\n02\nF5\nEF\nF8\n0A\n13\n0A\n10\nFA\n0F\n17\n0E\nE8\nF5\n00\n09\n0E\nFD\nF8\nFD\n11\nF2\n09\nE1\n14\n08\nF9\nEA\n0D\nFF\nF7\nF5\nE9\nF2\nEC\nFB\n13\nF3\n07\nFC\nEC\n14\n13\n13\nFF\n0D\n00\n10\n06\nFD\nF0\nFF\n11\nF4\nFD\nEF\n1C\nF3\n10\nF2\nFD\nFF\nF7\nEE\n04\nF9\nE6\nFC\n05\nED\n0A\nFF\nF9\n0D\n0D\n0E\nF9\n2B\n00\n0B\n0E\nFC\n0C\nFA\n0A\nFD\nED\nFA\n0F\n0E\n03\nEE\n06\nF3\nE4\nFC\nFF\nF1\nF6\nF8\nF9\nDE\n01\n02\nF9\nF3\n1A\n08\nFC\n26\n00\n06\n15\n07\nFB\nE8\n1A\nF1\nFC\nF0\n0F\n0C\n02\nE8\nFB\nF2\nEE\nFE\nFE\nFF\n0C\n00\n0B\nEE\nF9\nF7\nF8\n11\n07\n0E\n0A\n12\n00\n10\nFB\nF2\nFF\nF4\n0F\n02\nF4\n10\n08\n03\nF6\nE2\n0B\n02\nD7\n03\n04\n26\n18\n04\nF9\nE8\nFD\nFB\nFC\nEA\n03\nFE\n14\nF5\n00\n01\nF6\nF6\nF3\nF3\n15\nFD\nED\n04\n13\n05\n02\n08\n03\nF8\nC3\n04\nFF\n03\n0E\n19\n13\nF8\n07\n03\nF9\nF8\nFE\n16\n0B\nDA\n00\nFD\nF9\nE9\n08\nF6\n14\nED\nED\n2C\n00\nFB\nFE\n08\nFF\n00\nBA\nFA\nF9\n05\nF0\n09\nFC\n04\n09\nD6\n02\n0D\n01\n00\n10\nF2\n00\n0F\n05\nDD\nE0\nFC\n0A\nEB\nFF\n20\nF8\nED\n0A\n14\n0E\nEC\nBF\n18\nFE\nF7\nE8\n0C\nFA\n0C\nEF\nE8\nF1\n00\nFD\n0E\n0B\nDB\n00\nDC\nD7\nF1\nDC\n11\n1C\n0E\nFA\n0A\n1E\nF3\nEA\n0F\n00\nFC\nC1\n03\nF3\nD0\nF7\n18\n05\nFE\nFF\n0B\nF1\nFF\n12\n14\nF4\nD2\n00\n0E\nE8\nBD\nCF\n39\nEE\n13\nEE\n16\n03\n02\n03\n17\nE8\nE4\nBC\nDD\nD3\nF3\n02\nFA\nCA\nED\n09\nE3\nEB\nE0\n06\nF7\nF6\n16\n00\n30\n20\nF4\nFE\n23\nDF\nF8\nF3\nDD\nF2\nF9\nDA\nF1\n0D\nB6\nC3\nBF\nFC\nDA\nE1\nEA\nF8\nDD\n09\nE8\n00\nF1\n10\n12\n23\nFD\n00\n0A\n16\n0E\n01\nF4\n05\nF0\n01\nC6\nEF\n20\n24\n0C\n35\nBB\nFF\nE7\nD5\nF7\nFB\nDD\n00\nF2\nDF\nFD\n02\nF6\nF6\n12\n21\n0E\n00\n21\n2D\n04\nFE\nD4\n1C\nFD\n02\nDC\n00\nFC\n00\n07\n2C\nE3\n02\n02\nDD\n0C\nFB\nDB\n00\n0B\n00\nDE\n00\nDF\nE0\n20\n1F\n01\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n01\nFF\n00\n00\n00\n00\n00\n00\n00\n01\n00\n00\n00\n01\n00\n00\n00\n00\n00\n00\n00\n02\n00\n00\n00\n00\n00\n00\n00\n00\n10\n07\n0F\nF3\nFB\n09\nFC\n04\nEF\n0A\n0D\n20\n02\n12\nE9\n08\n03\nF2\n12\n04\n00\n00\n00\n11\nF4\n07\nFF\nEC\n1C\n14\nE8\n00\n1C\n19\nF9\n16\n13\nF2\n14\n01\nFD\n04\n21\n07\nF1\n15\nF6\n07\nF0\n02\nEE\nE0\nDE\nEB\nEE\nD2\nD9\n08\n05\n0C\n0D\n01\n1F\n00\nF2\n2A\nE0\nF9\nE6\n0E\nE9\nF9\n15\nFA\n01\nFA\n0D\n17\n1F\nE8\nF2\nE9\nF0\n0F\n02\nF4\nE4\nCC\nED\nFB\n09\nE6\n1B\nFA\n0F\n00\n03\nFA\nFC\nE7\nF4\nFE\nE6\n04\n16\nE8\nF8\nF9\n0F\n14\n04\nEC\nF6\nEC\n09\n11\n11\nF6\nE5\nB2\nCD\nEF\nE0\n0F\nF0\n11\nF6\n00\n00\nFB\nF7\nFA\n09\nFA\nF1\n06\n06\nF7\nF6\n09\n23\n14\n1C\nF0\nFD\nF9\n03\n00\n0A\nF3\n07\nAE\nD9\n06\nF3\nF7\nEE\nFC\nFB\n00\nF0\nEF\nF7\n10\nFD\n11\n0A\n00\n09\nEC\nFC\n03\n0E\n01\n16\n09\nF0\n09\nFD\n0E\n0E\nFD\nE9\n9A\nFD\n01\n14\nF7\n07\n08\n00\n00\n09\nF9\nF7\n06\nFC\n09\nEB\nE8\n16\nEF\n0A\n03\n1C\n06\n1B\nF5\n13\nFF\nFF\n0F\nFF\n0B\nFE\nCE\nFC\n02\n0B\n09\n04\n0A\nE7\n00\n03\n05\nF1\n0D\n13\n05\nFE\nED\n0E\nEF\n14\n0D\n13\n03\n13\nFD\n10\n00\n0B\n04\n09\n0A\n17\nDC\n03\n09\n08\nF6\n04\n02\n07\n00\n06\nFC\nF0\nF8\n0F\n02\n0C\n00\n00\nF8\nF7\n1F\nE4\n03\n0D\nF6\n04\n03\n0C\n01\n0E\n0F\n16\nDF\n0F\nE6\n02\nE7\n07\n0A\nFC\n00\n05\n00\nEC\n08\n16\nEE\nFF\n12\nFB\nF9\n08\n20\nD6\nFF\nF2\nF3\nFA\nFF\nFE\nF9\n08\n09\n16\nF6\n04\nED\n00\nF7\n0C\nF6\nFF\n00\n1B\nFC\nE0\n00\n19\nEC\nFC\n0C\nF4\nE8\n0B\n08\nF9\nF8\nFE\n01\nFC\n08\nF8\nFC\n0D\n15\n08\nF0\n22\nD3\n08\nF8\n00\nFF\n02\n00\n13\n06\nCF\n0A\n11\nF1\nF1\n08\n00\n12\nFD\nCB\nE6\nF8\nF6\nFF\nF7\n17\nFA\nFB\nFF\n11\n0A\n06\n10\nEC\nFD\n16\n01\n0C\n04\n00\n02\n0D\nEE\n08\nFC\n02\nF5\n05\nEF\n0D\nFB\nD3\nEE\nFA\nFA\n0E\nFF\nFC\nF6\n03\nFF\n15\n06\n13\n11\n14\n0D\n1C\n14\nF8\nF5\n00\n08\n02\nF1\nF0\n0B\nFE\nE8\n0D\n06\n0E\nFF\nF1\nF2\nEC\nF3\n07\n09\n03\nFD\nFA\nF3\n07\nEB\nFA\n02\nFA\n0A\n17\n15\n0A\n1A\n00\n0A\n01\n06\nF8\n00\n08\nF9\n07\nFE\n17\nE9\n0A\nEC\n01\nFA\n13\nEF\n0A\nF6\nED\nEF\n06\nFC\n01\n03\nED\nFF\n1A\n05\n06\n28\n00\n05\n0B\n09\n03\nF9\n07\nFC\nFD\nFA\n0A\n04\n0A\nF0\nFC\nFA\n0A\nFD\nF8\nF3\nF6\n03\n0B\nED\nF6\nFD\nFB\nFC\n04\n0D\n05\n22\n00\n0E\n08\nFF\n05\nF7\n08\nF2\n07\n0C\n01\n07\n03\nDF\nF9\nFB\nFF\nFF\nF8\n07\n12\nF6\n04\nEF\nF9\nF4\n09\n06\n0A\n13\nFC\n12\n00\n0D\nF6\nEC\nFD\n01\n0A\n0D\nE3\n10\nFF\nEF\nF2\nDE\n02\n10\n0B\n06\nFF\n12\n16\n09\n03\n08\nF0\n04\n02\nE5\n04\n01\n03\nDD\n00\n07\nE5\n01\nFC\n03\n0C\n04\nDC\n14\n0C\n00\nFE\nF3\nF8\nFD\nF7\nEC\n01\n03\n07\n0F\n08\n05\n07\n00\nFE\nF5\n02\n19\n12\nE2\n00\n0E\n04\nF0\nF5\nF4\n0C\n00\nEE\n2F\nF8\nF1\nFE\n06\n11\n06\nF7\nF2\n04\n0C\nF5\n04\n04\n0A\n06\nDD\n07\n04\n03\n0E\n10\nF9\n00\n0B\n0B\nD8\nF9\nFF\n1A\n0D\nEF\n35\nEC\nE9\n09\n05\nFF\n0A\nC2\n03\nF8\nF0\nF3\nF9\nEA\nFE\nF4\nC8\n08\nED\nFD\nFD\n03\nF6\n00\n0E\nF6\nE3\nE8\n13\n1A\n13\nF1\n10\n0E\nE4\nF6\n12\nF0\n1C\nB5\nE9\nEC\nF7\nF8\n18\nED\n14\n03\nF0\nE8\nC7\n00\nEA\nE7\nEC\n00\n28\n13\nD4\nDC\n0C\n0A\n07\n01\nF4\n17\nE0\nE7\n19\nF6\nE2\nC8\nD2\nE7\nF5\nEC\n0B\nDC\nD2\nFB\nFD\nFC\nDC\nF5\nFA\nF1\nFD\n00\n12\n1E\nEA\nFE\n0E\n02\nEF\n08\nEC\nE9\n07\nE6\n11\n07\nCA\nC3\nDA\nE1\n03\nEF\nC6\nEE\nD6\nF5\nF3\n07\n11\n0B\n2B\n2A\nE8\n00\n2C\n29\n08\nFB\nEF\nDE\nE0\n10\nF3\n00\nF0\n05\n0B\n0B\nB2\n03\nF2\n11\nF7\nFF\nBC\n00\nFF\nE4\nD7\n15\n00\n02\nDC\n04\n0B\n00\n06\nFF\n09\n00\n00\nFA\nFF\n00\n00\nFE\nFB\n00\n00\nFC\nFD\n02\n00\n0B\n00\nFF\n00\n00\n00\n02\nFF\n00\n00\n02\n00\n04\n02\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\nFF\n00\n02\nFE\nFF\n02\nFF\n00\nFF\n00\n00\n02\nFF\n00\n00\n02\n00\nFF\n00\n00\n01\n02\n00\n03\n00\n00\n00\n01\n02\n01\n00\n00\n0A\n07\n10\nEF\n01\n0E\nF9\n05\nEC\nF5\n0C\n1C\n00\n17\nEA\n0D\n06\nF6\nFC\n06\nFD\n01\n00\n17\nF8\n11\n02\nEF\n10\n05\nF7\n00\n1E\n2A\nFC\n02\n05\nF1\n0E\n00\nF3\nE8\n0B\n02\nFA\n0C\nF9\n02\nE7\n28\nF5\n0F\nDE\nD6\n19\nE4\nFE\n30\n16\n01\n27\n05\n28\n00\nF4\n0A\nF4\nE9\nE8\n1E\n07\nF6\nFA\n02\n06\nFD\n04\n12\n09\n1F\n0E\n04\nEB\n27\n06\nD0\nED\nE6\nDD\n01\nF5\nCA\n12\nEC\n14\n00\n15\nEC\nE1\nD5\n13\nEF\nE4\nFF\n19\nCD\n03\n0F\n13\n11\n10\nF0\nFF\nE7\n0D\n05\n0D\nC2\nFC\nB8\nDD\nE0\nEC\nF4\nFB\nFD\n06\n00\n07\nF5\nE6\n10\n07\nF6\nF7\n00\n0D\nE6\nFF\n04\n0C\n10\n02\n10\nFA\n04\n01\n10\n11\nDA\nF6\nBC\nBC\n0B\nFE\nFF\nE3\n09\n06\n00\n05\nE6\nE6\n0B\nF3\nFE\nFF\n04\n0E\nED\n04\n09\n05\nF6\n11\n19\nF6\n0E\n17\n1E\n18\nEF\n0A\nCA\nE4\nF6\n10\n05\n03\nFE\n0D\n00\n14\n02\nEF\nFD\n01\n17\nEF\nDE\n0F\nE9\n15\n04\nFE\nF1\n0A\nF4\nF9\n0F\n0A\n06\n1A\nF4\n11\nEF\n09\nF1\n07\n01\n08\nFC\nF3\n00\n06\n08\nE0\nE6\n0D\n0E\nFB\nE1\n11\nF6\n0A\n10\nFA\n00\n18\n07\n01\n08\n04\nF7\n18\nF9\n12\nFF\n12\nEB\n0E\nEE\n15\nF9\nF3\n00\nFA\n05\nED\nE6\n18\n0A\n08\nEB\n0B\n09\n00\n10\nD0\nFB\nF9\nF7\n08\n12\n06\nF0\n0F\nFA\n0C\n09\n10\nE3\n0C\nEC\n04\nFE\nE6\n00\n05\nFF\nE5\nF3\n1B\nF3\n01\n0C\n0E\n08\n05\n10\nE0\nF7\nFE\nF3\n05\n0C\n0E\nEB\n06\n0A\nFE\n13\n12\nDD\n02\n00\nFC\nF3\nF0\n00\n19\n06\nE5\nF6\n15\nE5\nFE\n0A\n06\nFA\n07\nF2\nF8\nF6\n06\nF9\n01\nFF\nFF\nF6\n0B\n17\n00\n11\n10\nE2\nF0\n03\n03\n06\n09\n00\n07\n0A\nE3\nFD\n08\nF1\nF9\n0C\n08\n08\nFD\nCD\nF4\nF5\nF9\n01\nFB\n0A\nF9\n05\n06\n18\nF4\n0D\n0D\n13\n0A\n0E\n04\n03\n05\n00\n12\n08\nEC\n0B\n0D\nF8\nE5\n06\nFD\nEC\nFE\nE5\nF2\nF8\nFB\n07\nFE\nF6\nF2\n17\n10\n12\n05\n12\n03\n13\n11\n15\n1A\n0B\n05\n00\n07\n03\nF8\nF4\n06\nF7\nE3\n01\n00\nFD\nFC\nEF\nFD\nFE\nFD\n0E\n17\nFA\nF6\nFE\n08\n01\nF2\n08\n0F\nF3\n04\n11\n20\n0B\n03\n00\n0C\nF6\n06\nFF\n08\n0B\nE8\n00\n00\n07\nE6\n01\nF6\nF6\nFA\n0A\nFA\n0C\nFD\nEB\n01\nFD\n01\n10\n00\nE5\n09\n14\n0E\n01\n16\n00\n00\nFC\n02\nFB\nF6\n09\nF7\n07\n06\nF5\n07\n00\nDF\n00\n0E\nFC\nF7\nF9\n02\nFE\n08\n00\nEC\n10\nEF\nE5\nF6\n0A\n1D\n07\n1C\n00\n12\nFC\nF6\nF8\nF4\n0B\nFE\n03\n1C\n0E\nFA\nF6\nD8\nF7\n13\n07\n02\n05\n28\n00\n01\n01\nF5\nFD\nEF\nFD\nFE\nFF\n09\nF1\nF6\n00\n00\nF9\n05\nD8\nEF\n03\nF9\nF0\n06\nF9\nFE\n04\nD8\nFA\n15\n04\n03\n00\n21\n08\nEC\n04\n0D\nF8\nFA\nFB\n07\nFE\n0B\n07\nDE\n00\n02\n04\nFB\nFF\nF4\n15\nFF\nEC\n08\n16\n01\nF2\n05\n15\n12\n0A\n02\nFC\n03\nF9\nFB\nF4\n01\nF2\n13\n08\nF4\nFB\nFA\n04\nDF\n00\n0F\nF6\n09\nED\n08\n13\nFF\nF2\n20\nF9\nF9\nF3\nF9\n15\n0D\nFB\nFD\nF4\n0E\nF5\n01\nF9\n17\n00\n02\n06\nF4\n01\n0D\nF0\n0A\n00\n0D\nF2\n00\nE6\n01\n18\n04\nF8\n0D\nEF\nEC\nFD\n03\n0F\n0E\nE5\nF6\nFA\n0C\n02\n06\nFF\nFD\n01\nE8\n0F\nEE\nEF\n01\nF8\nFE\n00\n0A\n1A\n04\nE2\nF6\n1B\n17\nF6\n01\n1B\n00\n15\n02\nEF\n00\n0D\nE8\nFE\n06\n0F\n07\nFE\n12\n15\nE5\nEF\nD3\nF6\nFE\nF8\n0A\n00\n19\nFE\nDF\nD7\n00\nF7\n13\nFA\nFB\nFB\n1D\nFB\n18\nE3\n00\n15\nDD\n0D\nF2\nF0\n1A\nF7\nE9\n09\nDF\n01\nDA\nE0\nD6\nE6\n0D\n00\n0E\n00\nE2\n12\n24\nDD\n00\n01\n26\nFA\nF8\nED\nFE\nB3\n05\n09\nD6\n25\n48\nFE\nC9\nE8\nDD\nF1\n09\n05\n36\n0C\nFF\n1A\n11\n00\n29\n27\n1A\nFA\nDF\nDE\nF1\n0D\n0D\n0A\nE1\n00\nFE\nF2\nDA\n02\n08\n32\nF9\n08\nE5\nFF\n1C\nFC\nC9\n07\n16\nFC\nCC\nE0\n2E\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\nFE\n00\n00\nFF\nFF\n02\nFF\n00\nFF\n00\n00\n00\nFF\n00\n00\n02\nFF\nFE\n00\nFF\n02\n04\n00\n01\n03\nFF\n00\n02\n02\n00\n00\n00\n03\n00\n00\nFF\n15\n04\nFF\n03\n00\nD9\nFE\n13\n00\nF0\nEC\nFB\nFB\nFD\nF2\n00\n02\n02\n00\n0C\nFC\n13\n0E\nF0\n00\nE4\n1C\n00\n13\n1F\n03\nEE\n23\nE4\n00\nFB\n21\nF3\nE2\n11\nFA\nBD\nFB\nDD\nD3\n3E\nFD\n1E\nF9\nEC\n1C\nD7\nEE\n13\n18\nED\n22\n30\n24\n00\nF5\nEA\nE3\nE1\n0B\n0E\nFE\n0B\nEF\nEC\n0C\n00\nDB\n07\n15\n16\n0D\n10\nE8\n25\nFF\nEB\n02\nF2\nF1\nED\nEC\nF3\n19\nF4\n22\n00\n0C\nDF\nD6\nF6\n02\nF3\n04\nFB\n07\nE3\n0A\nFA\n07\n16\n0D\n1D\n01\n09\nE5\nF3\n12\nCC\nDC\nDE\nF5\nEB\nFA\nF7\nFD\nFE\nD9\n00\n0C\nF0\nDB\n0B\nF3\nFD\nF5\n01\nFF\nF8\n0B\n06\n08\n0B\n10\n14\n07\n0F\n0A\n0C\n0A\nBC\n03\nF8\nEA\nF4\n0C\n06\nF7\n0E\nF7\n00\n0B\nE4\nD2\n09\nFD\n07\nFC\nF1\n07\nF8\n0E\n13\nFE\n09\n14\n11\n11\nFE\n1D\n00\n10\nB7\nFF\n03\nE1\nF1\n0B\nFC\n01\nEA\nEE\n00\n0D\n11\nE9\nFE\nFC\nF8\nF8\nE7\n16\nF8\n07\nF8\n03\n07\n16\n01\nFC\n05\n02\nED\n17\nD2\n09\n03\nF4\nD9\n06\n05\nFD\n05\n0D\n00\nFE\n0C\nE9\nEF\n0B\n00\n09\nF6\n28\n00\n00\n0A\nED\nFB\n00\n07\nF0\n06\n0A\nF3\n22\nD7\n0C\n04\nF7\nD1\n05\nE4\n01\nFF\nFA\n00\nE9\n01\nE6\nF3\n11\n09\n05\nFF\n1D\n10\n07\n14\nD2\nFC\n00\nFE\n06\n09\n0E\nF4\n30\nFE\n00\n12\n08\nD0\n08\nE0\n0D\nF9\nE9\n00\nFE\nFB\nFF\n09\n1A\n01\n00\n16\n14\n07\n03\n01\nEA\nF0\nF3\nEF\nFB\n09\n09\nE0\n22\n06\n0F\n10\n04\nF3\nFF\nFB\n0C\n00\n00\n00\n14\n02\nFC\nFF\n15\nF4\n00\n0C\n11\n04\nF6\nE9\nFB\nFE\n09\n05\nF8\n0C\nFB\nE5\n13\n1D\n0E\nFF\n22\n01\nF3\nFB\n0A\nF3\nFC\n00\n15\n11\nF5\n01\n0C\nE9\n00\n0D\n0C\nFD\nE5\nD9\nF5\nF1\nFA\nFF\nFC\n0D\n02\nFD\n03\n20\n05\n0C\n09\n1F\n0E\n03\n08\n0C\n09\n00\n1D\n0C\nFE\n09\n15\nF4\nE7\n06\n04\nFB\nFB\nEE\nFF\nF0\nF9\nFF\nEE\nFC\nED\nFB\n10\n0F\nF8\nFC\n00\n17\n13\n1A\n19\n10\n08\n00\n12\n07\nFF\nF8\n06\nF4\nE8\n06\nFC\n16\nFC\nF8\nF8\nFD\n04\nFB\n0C\n0B\nF1\nFE\n08\nFE\nE7\n02\nFE\nF9\n01\n0F\n1A\n16\n17\n00\n0A\n0B\n03\n0E\n03\n05\nF1\n06\n00\n00\nFB\nF7\nF5\nF7\n0A\nF8\n01\n13\nF6\nF0\n06\nFD\n02\nFF\n08\nFE\nF9\n0D\n0D\nFD\n1E\n00\n09\n10\nF7\nFA\nF8\n0A\nF6\n11\n00\nF7\nFC\n05\nF2\nF2\n17\n00\nF0\n03\n20\nFB\n08\n01\nFA\n0B\n0B\nF0\nFF\n02\n12\n10\n08\n00\n09\n02\nF9\nF0\nF9\n0D\n02\n09\nFF\n08\n05\nFF\nE1\nFF\n06\n0A\n03\nF9\n21\n01\n02\n00\nFA\n04\n14\nF1\nFF\nF0\n11\nFA\nD0\n00\n18\n04\n0F\nED\nED\n04\nEE\n00\n09\n07\nF8\n0D\nE8\n07\n1A\nF2\n00\n08\n16\n04\nF0\nFA\n16\nF8\n01\nEB\nFF\n0C\nFD\nFE\nD9\n00\n0F\n09\n03\nF7\nF2\n0F\nF5\nF7\n07\n01\n17\nF1\n00\n0D\n0D\n06\nF8\nF2\n08\nF9\nF3\n09\nFB\nE5\n12\nE1\nF0\n0C\nFB\n06\nFE\n00\n1C\n07\n07\nE8\nFD\n0C\n18\nF1\n0E\n18\nFB\nF4\n08\n10\n05\n00\n0E\nEF\n04\nFD\nFA\n06\n06\nF5\n02\nDA\nDF\nEF\n08\nF8\n03\n00\n08\n02\n17\nD4\nFE\n06\nFC\n01\n0B\n08\n04\n01\nF1\nF1\n1B\nEE\nFA\nEF\n12\nFC\nEF\n19\n0C\nFC\nEF\nF7\n01\nF9\n0A\nFF\n01\n00\n02\nFF\nFA\nE8\n02\n0C\n1D\n02\nF8\nFA\n1A\nFF\nF1\nE7\nFD\n0A\nFE\nF9\nF1\nFF\n02\n14\n10\n18\nE5\n01\nEE\nFD\nF6\nF6\n01\n00\n1E\n0C\nEC\n23\nED\nE2\n3D\n12\nF7\n02\n2B\nD4\nF5\nF8\nEB\n24\n06\n03\nFA\n08\n08\nFA\nF8\n13\nE9\n16\nFF\nF6\nE0\nF3\nFE\n00\n14\nF0\nEF\n0E\n29\nF1\n20\n0A\n1A\n15\nF6\nCF\n00\nD9\n0F\n0F\nE3\n11\n11\nF3\nD6\nEA\nDA\nD7\nF8\n04\n14\n08\nF2\nD5\nF2\n00\n00\nFD\n08\nFB\nF3\nFB\nF5\nFD\n04\nDB\nFF\nE7\nF9\nFC\n01\nF4\n13\n08\n18\n15\n18\n0E\n1A\nEA\nF7\n01\nF8\n0B\n0B\nF7\n30\n00\n16\n03\n03\n05\nFB\nE9\nFF\n00\n01\nF7\nF1\n00\nF5\nFD\nFF\n03\nFB\n21\n01\n03\n0C\n04\n0C\n00\nFA\n00\n00\n05\n00\n00\n0C\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\nFF\n00\n00\nFF\nFF\n01\nFF\n00\nFF\n00\n00\n00\nFF\n00\n00\n02\nFF\nFF\n00\nFF\n02\n02\n00\n01\n01\nFF\n00\n01\n01\n00\n00\n00\n0C\n00\n02\nFD\nF5\nFD\n00\n00\nF8\nDC\n00\n06\n00\n08\nEB\nFA\n02\n05\nE5\n11\n00\n03\n00\n26\nEE\n0E\nFC\n06\nFB\nEB\n04\n00\n0F\n18\nEB\n01\n29\n01\nEB\nF5\nF7\n15\n02\nF9\nE8\nDD\n07\nFD\nC3\n1D\nCC\n0E\nFD\n15\n02\n1A\n0A\n1A\n0E\n0E\nF0\nFD\nEF\n00\n00\n13\nD1\nFD\nE8\nEC\nF5\n0C\nEC\n14\n09\n05\nF9\n07\n17\n0E\nE7\n0C\nED\n23\nDC\n05\nF3\n1B\n20\nD2\nE7\n11\n0F\n04\n19\n00\n0E\nE4\nD8\nF6\nEB\nF9\n01\nF8\nFF\nE9\nF7\nFA\n1C\n16\n19\n0B\n00\n1F\nF9\nFD\nE8\nFD\nED\n12\n13\nDA\n03\nF5\nFA\nFE\nE9\n00\n08\nE9\nD7\nF9\nEF\n01\nF6\nF9\n11\n08\n00\n08\nFC\n01\n0C\n0A\nFD\n1A\n11\nFC\nEB\nDE\n02\nFF\nEE\nE6\n06\n16\n04\n15\nEB\n00\n1F\nFD\nEA\nFD\nF7\nFD\nF4\nF7\n10\nFA\nFA\n21\n0E\nFA\n20\n08\n0B\n0E\n05\nFA\nF0\nCE\n0E\n0F\nF0\nDF\n12\nFA\nF3\nF6\n07\n00\n0A\n22\nED\nF9\nFF\n16\nF1\nE4\n14\nFA\n04\n0B\n0D\n0C\n23\n08\n05\n02\n05\nFD\nFD\nBA\n03\n13\nF6\nD2\n05\nFC\n03\nFE\nF7\n00\n02\n11\nEB\nF7\n09\n0B\nF5\nFE\n1B\n0E\nF2\n06\nE4\n04\n0E\nFD\n00\n04\nFB\nFB\n11\nC3\n1F\n0E\nEC\nD1\nF7\nFB\nF6\n04\nFB\n00\nF8\n09\n04\n04\n12\n09\nF4\n0D\n1A\n12\nF2\n05\nD2\n04\n03\n05\n06\n0A\nFC\nF6\n19\nD4\n07\n0D\nF9\nE1\nF8\nF8\n09\n02\nF7\n00\n04\n05\nFA\n04\n14\n0B\nF4\n20\n12\n07\nF5\nFB\nF4\nF4\n08\nFF\n09\n1B\n04\nEF\n24\nC6\n0F\n0C\n0A\n01\nF4\nF8\n0C\n06\n03\n00\n04\nF8\nF2\n04\n16\nFA\nFB\n0F\n12\n05\nF9\nE0\nE5\n00\n03\n01\nFE\n12\nFE\nFD\n36\nED\n0C\n06\n1F\n13\n05\nFB\n11\n16\n07\n00\n16\n09\nFE\n0B\n01\nEC\nEF\n08\nFB\n08\nED\nE3\nED\nFE\nFC\n06\nF3\nFE\nF5\n12\n20\nFA\n01\n08\n10\n12\n10\n07\n23\n1B\nFF\n00\n1B\n13\n01\n06\n05\nF1\nEE\n0A\n03\n0B\nF2\nF9\nFE\nEA\nFE\nF0\nEC\n07\nF8\n01\n01\nF3\nFA\n02\n03\n0D\n0F\n09\n1B\n0C\n0C\n00\n22\nEE\n03\nF3\n08\nF7\nE4\n0A\nF9\n03\n0B\n11\n00\nF3\nFB\n02\nF6\n0C\n05\nF7\n02\n02\nF1\nFF\n06\nFD\nFE\nF8\n19\n13\n0C\n00\n0B\n0F\n08\nFD\n04\nFB\nED\n15\n07\nF6\nF6\n03\nE8\nF9\nF8\n09\n04\n16\n12\nF2\nF5\n06\n09\nF7\n10\n13\nFF\nFC\n09\n0B\n08\n00\n18\n02\n09\nF0\nFB\n03\nF9\n09\n0F\nFB\nFF\n05\nE6\nF3\n03\n08\nF7\n13\n21\n03\n0B\nF3\nF4\n0B\n08\nFF\nED\nFD\nFE\n0D\nE4\n00\n0C\n08\n00\nF6\nF5\n02\nF9\n0B\n03\nFE\nF9\n05\nE7\n01\n09\nFB\nEE\n06\n10\n05\n0E\nFE\nFD\n13\n13\nEA\nFB\n0E\n04\n08\nD9\n00\n1A\n0C\n04\nF8\nF1\n0C\nFB\nF9\n00\nF3\n02\n0C\nF1\nF6\n14\nFC\nF0\n04\n0C\nFC\nFE\nFA\n09\n22\nFE\nFB\nFA\nFD\nF9\nFD\nDD\n00\n10\n00\n03\nFA\nE7\n0E\n16\nFB\n05\nF6\n16\n03\n11\nF7\n1F\n04\nF0\nFA\n0C\n08\nF8\n03\nF7\n02\nF2\nE1\nEB\nFA\nFE\n02\n04\n00\n18\n05\n0F\nFD\nFE\nFA\n11\n01\n06\n08\n06\n0E\n01\nEC\n00\n06\nEF\n0A\nF5\n0B\n10\n05\n01\n0E\nCB\nE5\nF2\nF3\nFA\n0A\nF9\n00\n0E\n0B\n15\nFF\nF6\n13\n0F\n0B\nEF\n0C\n01\n03\nEA\nF8\n04\nFB\n10\nF5\nEF\n0A\nF7\n10\n07\nF1\nF4\nF1\n0D\nFE\nEB\n09\nF7\n00\n08\n12\n04\n17\n04\n1A\n16\n0C\nE2\n04\n0F\nF7\nDF\nDC\nF3\nF4\nF5\nED\nFE\nF2\nFE\nFC\n12\n00\n06\nEF\nFC\n0A\nF5\nF6\n07\n00\n12\n06\n02\n24\nEB\n0D\n16\n14\nDA\nEA\n09\nF4\n07\nDE\nF4\n02\nFE\nF8\n11\n0C\n27\n0A\n24\n1E\nFD\nFF\n14\n14\nF6\nE3\nF8\n00\n22\nDF\nF5\n06\n49\n0B\n1F\n12\n25\n04\nD4\nD8\nFC\nD5\n1A\nF7\nEF\n26\n00\nE3\nFC\n06\nEB\nC9\nED\n01\nF8\n16\nCD\nD7\n06\n00\n1E\n19\n10\nEA\nED\nE9\n1F\n0E\n1E\nEE\nE4\nCB\nEB\nFE\nEE\nEA\nF6\n2B\n11\n0F\nFB\n06\n0C\nDC\nDB\n01\nDE\n16\nCC\nE0\n3B\n00\n17\n11\n05\n09\nF4\nD9\nFF\n00\n04\nF5\nF6\n00\nEC\n02\n00\n05\nF8\n23\n03\n05\n17\n04\n0B\n00\nFF\n00\n00\n05\nFF\n00\n11\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\nFF\n00\n00\nFF\nFF\n01\nFF\n00\nFF\n00\n00\n00\n00\n00\n00\n01\nFF\nFF\n00\n00\n02\n01\n00\n01\n01\nFF\n00\n01\n01\n00\n00\n00\n0E\n04\n02\nED\nEB\nFD\nFE\nFF\nFC\n02\n05\n17\n03\nF3\n0F\nF5\nE8\nFB\nF5\n0B\n0D\nFC\n00\n2B\nFE\n01\nEC\n0B\nFA\n0A\nF2\n00\n12\n2E\nD1\n0C\n0A\n0D\n03\nF1\nE3\n1D\n0F\nE7\n0E\nFE\n09\n0F\nCC\n08\nC2\n0F\nF7\n11\nF4\n15\n16\n18\n0A\n11\nD8\n09\nE6\n00\n18\n11\nCA\n08\nFB\nDD\nF2\nFE\n03\n29\n07\n13\n02\nF7\n05\n05\nE6\nFA\n0A\n17\nD8\n01\nD9\n1E\n26\nDD\n0A\n05\nF7\n08\n03\n00\n0D\n02\nDD\nFC\nE7\n02\nFB\n08\n06\nFD\n0A\n07\n08\n0F\n02\nFF\nF8\n0F\n01\nF6\nDA\nFF\nEC\n10\nEE\nDA\nE8\nFA\nEE\nFA\n01\n00\n15\nFD\nE8\nFD\n00\n04\n0A\n11\n02\nFB\n10\n05\n01\n07\nF6\n20\nE7\n1E\nFE\nFE\nD2\nF6\n0A\n02\nEA\nE3\nF8\n03\nFE\n04\nE8\n00\n02\nF2\nFE\n0E\nF4\n00\nF7\n01\n12\n01\n0A\n0F\n15\n04\n21\n1C\nF5\n0B\nF0\n01\nF7\nE5\n0E\nFD\nF5\nCA\n00\n13\n01\n02\nF9\n00\n00\n08\n08\n0A\nFA\n0B\nF4\nED\n13\nFA\nF8\n01\n0E\n03\n16\n1A\n04\n24\n0D\n09\nE4\nC5\n02\n19\nF2\nD7\n00\n0E\nEC\n00\nEE\n00\nFA\nFA\nFB\nFC\n11\n04\nF7\n01\n1A\n04\n01\n09\nF6\nFC\n0D\n0C\n00\n0E\nF8\n02\nE8\nC1\n01\n0D\nE8\nD9\nFC\nFA\nF7\n0A\nFD\n00\nEE\nFA\nF8\n06\n14\n05\n03\n0C\n0F\n0D\nFE\nFE\nEF\n06\n20\n0A\n04\n0E\n0A\nF5\nFD\n9D\n0E\n05\nF8\nF7\n01\nF1\nED\n00\n04\n00\nFA\nFA\nF9\nFF\n18\nF8\nF0\nFD\nFD\n07\n10\nF0\nE1\n04\n06\n04\nF7\n18\n01\nFA\n0C\n81\n09\n0C\n0A\n1B\nED\nF6\nF2\n14\n0C\n00\nF6\n0D\n00\nFC\n05\nF5\nF0\nF9\nFF\n0F\nFF\nE5\nF4\nFF\n01\nF3\n01\n0A\n01\nF5\n19\n98\n0F\n09\n16\n2A\n0C\nF3\n04\n0F\n0D\n00\n08\n08\nFE\nFD\nF7\nEA\nEA\nFC\nF8\n1E\nFC\nE1\nE8\nF9\n08\nE9\nEF\n02\n09\nFF\n1C\nC3\n18\n07\n08\n1F\n0E\n05\n17\n17\n00\n00\n0E\n0A\n06\nF6\n03\nF8\nF9\n07\n01\n07\n02\nFD\n01\nF3\nFF\nEE\nF4\n08\n0A\nF8\n05\nDA\n03\n07\n03\n0C\n18\nF3\n17\n0E\nFE\n00\n0F\nFF\n06\nEF\nFF\nFF\nFB\n0D\n02\n02\n04\n04\n02\nFA\nFD\n0E\nF6\n1C\n18\nF0\n09\nF6\nF4\n04\n13\nFA\n03\nF5\n0A\n0E\nFE\n00\n06\n06\n01\nF1\n06\nFB\nF2\n09\n0E\nED\n02\n0C\nE7\nF9\n01\n0D\n01\n14\n1F\nF1\nFA\n01\nFB\nFF\n16\n09\nEF\nFE\nFC\n04\nFD\n00\n09\n08\nF8\nF0\nF1\n0C\nFA\n02\n0C\nFC\n0B\n0C\nFB\n0A\n16\n0D\nFD\n04\n11\n02\n06\n0A\nF1\nFB\n0E\n08\nE0\n14\nFA\n09\nE6\n00\n18\n0C\n00\nF1\nF7\n03\nF5\n01\nFA\nEB\nF3\n1B\nF0\n06\n0E\n02\nF3\n00\n0A\n06\n08\nED\n05\nFA\n04\n02\nF7\n06\nF6\nFD\n02\n00\n06\n05\n05\n01\nF2\n06\n03\n02\nFD\nEE\n01\n06\nFF\n05\n12\nFC\nFC\nFF\nFD\nED\nF9\nFB\nFB\n0E\n05\n1A\n02\n0F\nF3\nE3\nE7\n00\n0F\nFA\n10\nFD\nF4\n08\n0B\n01\nFF\nF8\n08\nFB\n12\nF3\nF7\n0C\nF7\nFE\n06\nEF\n00\n07\nF4\n01\nF8\n05\nFE\nF4\nFF\nFD\n04\n00\n14\n09\n15\n0E\n09\nFA\nF6\n03\n06\nF4\n05\n02\nF2\nE5\n16\n04\nF5\n04\nFC\nF0\n0F\n08\n17\n01\nD7\nF6\n00\nF0\nFF\n0F\nF0\n00\n17\n0D\n04\n0B\n0D\n06\n05\n02\nF2\nEC\n03\n0F\n10\nEC\n16\nFB\n08\nFF\nF9\nF6\n06\nFB\n18\nFC\nE8\nF8\nFC\nE6\nEF\nF9\n00\n00\nFB\n0D\n04\n00\n18\n02\nF5\n07\nF9\nF8\n14\n06\nF8\nFC\n07\nFB\n02\nF1\n03\nEB\n0B\n04\n19\n03\n0B\n0A\nEB\n02\nE8\nE8\n0F\n00\nFD\nEE\nFE\nF3\n05\n10\n01\n13\nF9\n05\n24\nEE\nF9\nF4\nE0\n0C\n10\nED\n30\n04\n06\n0F\n11\n2B\nE8\n06\nF8\n08\nF4\nFC\nF2\n00\n20\n02\n2E\nE6\n08\nF4\n10\n0D\n0C\n25\nDF\n0C\nEB\n23\n19\n10\n31\n1B\n43\n15\nDF\n0C\nF1\nE4\nE6\nD8\n09\nC6\n10\n16\n01\n00\n03\n11\n25\nF8\nDD\nF5\nF4\n0A\nFF\n02\nFF\nE0\nDC\n23\nF4\n34\n37\n19\n17\n26\nEE\n27\n0A\nF9\n19\nE2\nD8\nF6\n02\n01\nE6\n00\nE6\n29\n07\n03\nEC\nC9\n00\n00\n25\nF7\n1D\n03\nF3\n13\n0C\nF0\nFC\n0D\n0B\n0C\n04\n03\nDE\nFD\nEF\n00\n00\nF6\nED\nFA\n11\n00\nF6\n07\n01\n04\nF8\n00\n00\n02\n00\n01\n01\nF7\n00\n11\nFF\n00\n0D\n00\n01\n00\n00\n00\nF7\n00\n00\n00\n02\n01\n00\n01\nFE\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\nF4\n0B\n04\nF2\nE9\nF9\nFC\nFF\nFE\n0C\n09\n12\n04\n07\n05\nFD\nF6\nFF\nFE\n00\n06\nF6\nF7\n25\nF8\n00\nFC\n09\n02\n07\nF6\n00\n16\n21\nEF\n19\nE8\n05\nE9\nF4\nF6\n0E\nF3\nF6\nF6\nF4\n18\nFF\nD2\n15\nC7\n22\nE6\n35\nF8\n3F\nF1\n0A\nFF\n12\nC0\n0D\n05\n00\n18\n1C\nE9\n19\n0E\n02\nF2\nF9\n08\n08\n0A\n13\nED\nF8\nF8\nFB\nEE\n0D\n12\n0B\nD9\nFF\nED\nFB\nFF\nEF\nFF\nF6\nD5\nF5\n03\n00\n19\nEC\nF6\nF8\n03\n09\nF6\n09\n00\nF4\n19\n0A\nFD\nFB\nEF\nFF\nDC\n15\n08\nF6\nE2\nF8\n01\n0B\nF0\nD6\nE7\n02\nE7\n0B\n04\n00\n03\n02\n11\n00\n04\n00\n0D\n03\n14\nEB\n10\nFF\n00\nFE\n05\n23\nD1\n23\n04\n00\nD7\n03\n03\nE8\nF5\nE6\nF0\n0E\nDF\nFE\n00\n00\nFF\nFC\n11\n03\nFC\n03\n02\nFF\n0F\nFA\n07\n07\n0D\n07\n12\n15\nF5\n18\n0A\n0E\nE2\nF6\nFF\nF6\nF3\nDE\n04\n14\nDA\nFA\nF0\n00\n05\nF4\n02\nFE\nFF\nFA\nFB\nF1\n17\nFD\n10\n09\n09\n10\n0F\n0C\nF6\n10\nFF\n0E\nBC\nF7\nF8\n00\n02\nD6\n0A\n0D\nE4\nEE\n04\n00\n01\nEF\nF7\nF1\n08\n0B\nF4\nF8\n0E\nFC\n01\n0A\n15\n04\n16\n10\n05\n13\nE5\n07\nC1\nEB\nFF\nF8\n01\nE4\n0E\nF6\nEB\nF1\n08\n00\nF7\nFD\nF9\nFE\n05\n08\nFD\nFE\n01\n1B\n05\nF7\nF3\n0C\n11\n0E\n0C\n12\nE6\n05\nCC\nE6\nFA\n05\nEE\n08\nF8\n01\nD7\n07\n04\n00\nE7\n01\nEC\nEF\n03\nF9\nF8\nFA\nEF\n18\n14\nE8\nDB\n0D\n15\n0A\nFB\n09\nE4\n00\nDB\nE0\nF7\n03\n0D\n0A\nF4\nF9\nF3\n05\n08\n00\n0C\nE5\nFF\nF4\n0D\nF1\nF3\nF1\nEB\n17\n08\nEB\nE3\nF1\n14\n01\nF4\n10\nF9\nF4\nE3\nC0\n10\nFA\n1D\n24\n08\n01\nEC\n06\n04\n00\n14\nF7\n00\nEC\nFA\nF7\nE1\n04\nF3\n0D\nF8\nF3\nF2\nFD\n1B\nF5\nF2\n05\n08\nF2\nE9\nDD\n1C\n09\n0D\n20\n15\n0A\n10\n0E\n00\n00\n0C\n07\n07\nEB\n01\nFF\nEE\n17\n09\nF6\nF8\nFE\n08\nFC\n06\n0A\nEC\n1A\n09\nF6\nF4\nF6\nFF\n0D\n0C\n0B\n1C\n11\nF8\n05\nFB\n00\n09\nFE\n15\nF9\n00\nF7\n02\n14\n11\nFB\nFB\n04\nFC\n07\n18\n0C\nFB\n15\n0F\n07\nF8\nEE\n04\n0A\n12\n08\nF2\n06\nFE\nF5\nF1\n00\n10\nFD\n01\n03\nFA\n0C\n05\nFC\n01\nF1\n04\n09\nEE\nFB\n0B\n0A\n02\n02\n03\n14\n07\n00\nFB\n09\n14\n08\nEB\n09\n0C\nFC\nFA\n00\n14\n0B\n05\nF2\nE5\n11\n02\nF9\n09\n00\nF2\n06\n0C\n11\nFF\n0A\n1A\n07\n0C\n02\n01\n00\nFF\n07\n04\n0D\n01\n0E\nF7\nFE\nF9\n00\n11\n07\n02\nEF\nF2\n04\n04\n01\n00\nF9\nF5\n13\n0C\nFC\n0F\nF2\n07\n00\n08\n06\n00\nFD\n0F\nF5\n0C\n0A\nE6\n03\nEA\nF5\n02\n00\n0A\n08\nF1\n0C\nEF\n05\n0D\n04\nFB\n02\nFA\n05\n03\nE4\n0E\n04\nF0\n0D\n00\n0A\n04\n03\nF5\n11\nF3\n0F\nF2\n18\nE9\nE4\nF5\n00\n06\nF8\n00\n10\n04\n10\n0A\n0B\n03\nFD\n01\n13\n17\nFD\nF4\n1B\nF7\nF5\n01\nF2\n09\n07\n02\nF4\nDF\n12\nF4\n09\nF0\nF8\nFE\n00\n0E\n04\n0C\n09\n07\n0F\nF7\n0C\n08\nF8\nFB\n14\n0C\nE9\n0D\n00\nEE\nF2\nFA\n10\n02\n02\n1C\nFE\nDD\n00\nF7\nF8\nF6\n04\nF0\n00\nFE\n0B\n05\n09\n01\nFA\n06\n0B\n04\n06\n1A\nFE\n08\nE1\n07\n07\nFD\n0D\nF2\n00\n07\nF7\n0B\n0B\nE2\nDD\nE8\nF3\nEF\nF1\n03\n00\n05\nEE\n07\n00\n0B\nF7\nFD\n0F\n07\n02\n10\n00\nFF\nD4\nFD\nFF\nFE\n0E\nF0\nFC\n1B\nE1\n11\nFA\nFE\nD2\nE9\nFB\nDB\nD4\n0D\n00\n0D\nE0\n0E\n05\n20\nF6\n03\n12\n1C\nFE\n0A\nEC\n03\nDC\nE4\nEB\nF8\n06\n0D\n04\n08\nDF\nFE\n24\nD4\n03\nE6\n02\nD0\nF8\n16\n00\n26\n1D\n0D\n03\n1F\nEB\nF8\nFA\nFF\n23\nDB\n03\n1D\n0D\n07\n06\n25\n1A\n0C\n04\nED\nFE\n07\n05\nF4\nFA\n02\nCA\n15\nFA\n05\n00\n06\n0B\n19\nF5\nE6\nDF\n03\n0A\n00\n25\nFF\n00\nE6\n1F\nF4\n33\n2D\n19\n24\n2A\n02\n13\n01\n08\n1D\nDF\nF1\nF9\n29\n19\nEF\n00\n02\n08\n11\n00\nFF\nE3\n02\n01\n07\nED\nF1\n00\nEC\n01\nF3\nF5\nFC\n24\nFF\n13\n00\n00\n0D\n01\nFE\n01\n01\nFF\nFC\nFD\n18\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\nFD\n0E\n11\nFE\nFA\n01\n00\n00\n02\n00\n11\n03\n00\n1D\nF9\nF7\n06\nF0\n01\nFA\nF6\nEE\nF2\nF5\n01\n00\nFB\nF3\n02\n00\nF8\n00\n13\n04\nF9\n01\n00\n1A\n09\nFA\nD2\n25\n13\n06\n0D\n1A\n04\n1F\n0B\n00\nE3\n0E\n2F\nD8\nD8\n09\nE6\n05\nF2\nE3\n26\n02\nDD\n00\nFF\n13\nFE\n00\nEF\n2B\nD9\nFF\nEC\nF5\n12\n1A\nDB\nE3\n32\nF9\nFE\nFA\nE5\n0F\n05\n37\nFD\n18\nE8\n11\nFA\n1B\nE0\nE1\n1A\n00\n19\nF8\n09\n0D\n09\n23\nEA\nF1\nFD\n07\n01\n1B\nF5\nF3\nFD\nFC\nF7\n04\n01\nFF\nF9\n04\nFC\n0E\n09\nF9\nF7\n02\nF9\nF2\n0B\n00\n0A\nF1\n07\n05\nEC\n03\nF6\nF9\n03\nF6\n0A\n06\nF9\n06\n0A\nFB\nD2\n16\nFE\n04\nFB\n0C\n0E\n11\n15\nD9\nF5\n11\nE9\nF0\nF8\n00\nF4\nFE\n03\nFC\nF6\n0A\n01\nEE\n07\nC4\n17\n05\n1B\n0A\n01\n0F\nF2\n04\n02\nFA\nE9\n0F\nFA\n15\n02\nF1\nEE\nFD\nEA\nED\nF4\n00\n08\n06\n03\nFC\n06\nF7\n01\nF4\n0B\nEE\nFD\n01\n1A\n04\n0A\n00\n06\n05\n0D\nF6\nC4\n04\n01\n15\nFB\nF1\nF0\n06\nE1\nE6\n02\n00\nFC\nFB\n12\nF1\n0A\n05\nFB\nF1\n0A\nFB\n05\n07\n01\n0D\n02\n0B\n06\n04\n06\nFF\nB3\n09\nF0\n08\n01\n03\nF5\n11\nD8\nEB\n03\n00\n07\nEE\nFA\nE8\n0C\n03\n03\nE8\n12\n0C\nF7\nFC\n15\n07\n03\nFC\n18\n01\nEB\nF9\nB5\n0D\n0A\n0B\nE8\n07\nFE\nFE\nE9\nEC\n0F\n00\nFF\nF4\nF2\nED\n09\nFC\n0E\nF4\n10\n01\nEA\nE3\n0D\n04\n11\nFF\n0B\n0E\nED\n04\nBF\n1D\nFB\n04\nEE\n0D\nFB\n05\nC8\n06\n01\n00\n01\nEB\n01\nD2\n10\n0E\n03\nF2\nEF\n1E\nE6\nE8\nFC\n01\n1B\n08\nFC\n0E\nF3\n03\nAF\n02\nFE\nFE\nF5\n15\n02\nEA\nD3\nFB\n00\n00\nF7\nF1\nFA\nE4\nFE\n05\n0D\nFB\nEA\n1E\nFD\nE6\nFB\n07\n11\n0F\n0A\n07\n07\n10\nB8\n04\nFD\nF7\n04\n0D\n13\nF1\nDF\nF7\nF6\n00\n0D\n0E\n08\nFE\n04\nEF\nF6\nFB\nFC\nE4\n02\nF2\nF6\n07\nFD\nFE\nFD\n04\n11\n1C\nD6\nF2\nFE\n09\n01\n13\n0C\nFE\nEF\nFA\n05\n00\n10\n12\n14\nEE\n02\n04\nEB\n0C\n06\nF0\n00\n13\n1A\n01\n1E\nFF\nF3\n0D\n15\n0A\nEB\nEE\nF6\n04\n12\n14\nF9\n06\nF0\nF4\nEF\n00\n0C\nF9\n0F\n0A\n03\n0B\nFB\n11\n0A\nF6\nF8\n06\n10\n04\n15\n02\nF6\n18\n0D\n19\nEF\nEB\n01\n02\n19\n10\nEA\nFF\n09\nFE\n01\n00\n12\nFE\nFE\n15\n03\n0B\nFF\nF6\n00\n01\nFE\nFA\n13\nFE\nF9\nF5\nF3\n09\n03\n0F\nF9\nF0\n01\n01\n10\n08\nFB\nFF\n0F\n03\n05\n00\n19\n02\n09\n10\n01\n05\n0A\nF8\n03\nFA\n08\n03\n09\n0D\n02\n01\n03\n04\nFE\n06\nFF\nF2\nFE\n07\n09\n09\n03\n0F\nEF\nFC\nF8\n00\n05\n05\nF1\nFC\nFC\n0B\n04\nFD\n03\nFE\n06\nFF\n09\nFB\n00\n0A\nF7\n15\nFE\n00\n0A\n05\n13\nF5\n19\n0A\nF3\n09\nEE\nF6\nFB\n00\nF3\n12\nF0\nFB\nEF\n08\n0F\n04\n0D\n0B\nFD\nFD\n08\nF7\n04\n0C\n04\n1A\nFB\n07\nFB\nF4\nF4\n0F\nFB\n06\nF4\n1F\nF9\nF2\nFE\n00\nF6\nFD\nF6\n03\n04\n12\n06\n12\n01\nFC\n0A\n0B\n20\n07\n06\n12\nF8\nFA\nFC\n0C\n01\n04\nF9\nFB\nE2\n12\nDE\n06\nEC\nDB\nF9\n00\nF2\n05\nFA\n09\n05\n09\nFC\n0B\n08\n0E\n02\nFD\n14\nD1\n03\nF8\nF9\n04\nE6\n0F\n09\nFD\n03\n01\nE2\nF2\n04\n02\nF7\nEE\nF7\n00\nF3\nFA\nEA\n1A\n03\nF9\n08\n06\n10\n0A\nFE\nD5\n10\nD6\nED\n09\n0B\n1C\nF0\nF0\nFD\nF7\n04\n0B\nE4\nD3\nF8\n02\nED\nEC\nFB\n00\nFC\nEE\nFC\n0F\n08\n01\nE5\n1A\n0D\nF9\nF5\nE0\n09\nE1\nE4\n05\n05\n2C\nF6\nFA\n0A\n05\n0D\n14\n09\nE3\nFB\n05\nDC\nE6\nFC\n00\nF6\nEF\nFB\nF8\n0B\n17\nE7\n17\nF7\nEA\n10\nFA\n0E\nFC\nC6\nFD\n0E\nFE\nE9\n00\n18\nF0\n00\n27\nF8\n04\n08\n03\nB4\nFC\nFA\n00\n13\n1C\n02\n13\n2A\nDF\nFD\n01\nE5\n0C\nEA\n08\n0F\n05\n04\n0F\n29\n1B\nF1\nF8\n1D\n1B\n0B\n1E\nFD\n12\n07\nD6\n10\nF7\nF4\n00\n00\n0E\n17\n02\nFB\nF1\n0F\n05\n05\n05\nFF\nF5\nFC\n02\nFF\nF4\n03\n18\n02\n03\nFA\nFB\nFD\n0D\nF7\n04\n02\nFA\n00\n00\n09\n00\n01\n01\n01\n00\nFF\nFE\n01\n01\n01\n00\nFF\n00\nFE\n01\nFF\nFF\n01\n01\nFF\n01\n00\n00\n00\n01\nFF\n00\n01\nFF\n01\nFF\n01\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\nE7\n00\n00\n00\n03\n00\n00\n00\n05\n00\n17\n00\n00\n12\n12\nEC\n0F\nE4\n04\nFA\n00\n00\nE7\nEB\n19\n00\n00\nEF\n00\n00\n00\n00\n1B\n00\n15\n2B\n08\n07\n15\nFB\nF9\n10\n08\nF6\n07\nF6\nF7\n1B\n35\n09\n0C\n12\n14\nDA\nE6\nFB\nF7\n1E\nE5\nF2\n0E\n00\nD3\n00\n21\n11\n26\n19\nED\nFE\nFE\nF9\n0C\n00\nF5\n07\nDA\nCF\n1C\nDB\n20\n1C\n11\n2E\n1F\n05\nF7\n30\nD0\n25\nDE\n09\n02\nE1\n0D\n00\nF6\nFD\n19\n23\n0B\n2D\n01\n00\n0E\n0B\nFC\nFB\nE7\n02\n06\n00\nF2\n0C\nEC\nF4\n07\n12\nE9\n12\nFD\n01\nE0\n0A\n1E\nBC\n08\n00\n00\n11\n0A\n22\nF6\nFD\n27\nF2\n1C\nF5\nFC\nED\nE5\n0C\nF5\n0C\nE2\n1A\nFB\n11\nF6\n03\n0E\nF9\n05\nFA\n08\n07\nE7\nEA\nE2\n00\nF4\nF9\n09\n0B\nF6\nF7\n05\nEE\nFF\nE6\n06\nF8\n05\nF7\nED\n0E\nE6\n03\nF2\n0D\nF8\n05\n06\n1A\n01\n10\nFF\n00\nF9\nE9\n03\n00\n03\n02\n11\n04\n0E\nEC\nF7\nF3\n06\nDF\nF6\nFE\n03\nF9\n07\n01\nFA\n00\nFF\nFF\nF3\n0B\n05\n14\n00\n06\nED\n10\n02\nE0\n0C\n00\nFD\nF7\n1D\nFF\n10\nF9\n0F\nEA\nF3\nCE\nFF\nEE\n02\n16\nFE\n13\nF7\nFF\nEF\n11\n06\n0A\nF7\n10\nF8\n09\nF7\n04\nE6\nEC\n09\n00\n01\nF5\n02\nFF\n0C\n0B\n08\nF2\n01\nD6\nEF\nF3\n13\n07\n19\n05\nFC\n07\nE1\n0D\n00\n09\n0E\nFD\nF5\n0E\nE4\nFE\nF7\nE6\nF4\n00\n02\nF0\nFA\nEC\n15\nF8\n09\nFF\n0C\nE9\nEF\nEF\n0B\n07\n08\nF9\n00\nF4\nE8\n04\nEB\n14\n02\nF8\nF0\n12\n0B\nFC\nE9\nF6\nF5\n00\n0D\nF1\n0F\nEA\n13\nEB\n0D\nF6\nFC\nFA\nF3\nF7\nFB\n0F\nF7\nFE\n0A\nF4\nFE\n07\nF2\n19\n01\nF7\nE9\n12\n0F\nED\nEA\nF1\n06\n00\n06\n05\n04\nF7\n18\nF8\n14\nFE\nEF\nF9\nFD\n0C\n02\n11\n0A\nFA\n04\nF1\n1B\n02\nE9\n16\n0E\nF8\nE6\n0D\n15\nEC\nF2\nE7\n0A\n00\n0A\n0F\n03\n0C\n07\nF2\n08\nFE\nEA\nEE\n02\nFC\n00\n18\n11\n05\nFF\nF4\n08\n10\n01\n0D\nFD\nF8\n05\n04\nFC\n09\nEA\n01\nEF\n00\nFB\n0F\n0B\n01\nFF\n03\n03\n11\nFC\nF7\nE6\n05\n10\n00\n27\nFC\n03\n06\n0B\n01\n00\nFB\n02\n00\n17\n06\nED\n06\nFE\n00\nFB\n00\n04\nF6\n0A\n16\n14\n08\n06\n06\n07\n08\nEF\nF8\n11\nFE\n08\n08\nFB\n11\nFD\n0A\nFC\nDF\nF6\nF8\n06\n0F\n02\n0A\n0F\nFE\nFF\n00\n09\n0D\nFC\n1A\n0B\n0B\n02\nEA\nEF\nFD\n00\nF0\n19\nF4\n06\nFA\nEE\n11\nED\n06\n02\nF8\n02\nF9\n04\n00\nFF\nFF\n04\nFD\n0B\n00\nFE\n0B\nFE\n10\n09\n09\n04\nEE\nFC\nF8\n18\nFF\n16\n08\n05\n00\nF9\n1D\nF7\n06\n10\nFF\n03\nFD\n0D\n0A\n0E\nFC\n0D\nFC\n06\n00\n09\nEE\n08\n18\n10\n09\n0D\nE6\n03\n03\nFD\n07\n0A\nF1\nF5\n09\nFB\n2A\nE7\n00\n12\nFE\n1D\n03\n09\n24\n07\nFE\n07\nED\n07\n00\nE3\n00\nF6\n0D\n01\n0D\n05\nF3\n01\nFE\n09\n0D\n13\nF0\nFB\n08\n0B\n13\nF9\n0B\n06\nF6\nFB\n18\n03\n06\n09\n10\n03\nE2\nFE\n00\nFB\n0C\nFD\n1C\n06\n06\nF6\n08\nFC\nF0\nFE\nFA\n02\nD5\n0E\nF7\nF7\n06\nF0\n0B\n07\nF4\n03\n00\nED\n05\nFB\n19\nE6\nF5\n09\n00\nF0\n01\n0A\n1B\nFF\nFD\nFA\nFD\nFF\n04\nFB\nE6\n01\nD4\n14\nE9\n11\n08\nF5\nFB\n07\nF8\n03\n02\nEF\n08\nFB\n05\nFB\n08\nF9\n00\nED\n01\nFB\n22\n0A\n02\nF8\n01\n08\n00\n03\nE4\n09\nDF\nF2\nF4\n0B\n17\nEE\nF9\n0B\n05\nFE\n03\nE4\nE6\nFC\n06\n04\n09\nFA\n00\nD5\n0B\n12\n23\nF9\n05\nE0\n0A\n04\nFE\nF1\nCB\n0E\n00\nF1\nFA\n05\n26\nED\nFD\n1A\nF7\n0F\n13\n14\n05\n18\n05\nF8\n09\nE7\n00\nE1\n15\nFB\nFC\nF1\n1A\nFA\n16\nFC\nF9\nF2\nF6\n0A\n19\nEC\nFF\n10\n1E\nFD\nFA\n04\n02\n18\n07\n0A\n14\n37\nF0\nDC\n05\n04\n00\n0D\nF7\n01\n22\n0F\nFE\n29\n05\n05\n17\nFD\nF5\nEB\n0E\n05\n0F\n1D\n28\nF1\n07\n1F\n01\nF2\n03\nE0\n17\n1A\nD8\nF5\nFE\n05\n00\nFE\n05\n04\n02\n00\nF6\n06\n01\n02\n00\nFF\nFD\nFF\n01\n04\nFB\n04\n06\n03\nFE\nFC\nFB\nFF\n04\n00\n04\n01\nF9\n00\n00\n06\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n13\n00\n30\n19\n06\nDF\n15\n00\n14\n15\nE7\nF5\n04\nED\nF0\nF7\n14\n25\n14\n27\n13\nE6\n35\n15\nFA\n12\nFA\nFE\n1D\nFF\nE1\n00\n11\n0C\n01\n29\n00\nDD\n0E\nFE\n16\n0A\n02\nEC\n12\nE4\n0B\nCE\n19\n0F\n10\n16\n1B\nF4\nF5\n20\n0C\n32\nE8\nF8\n13\nE1\nEC\n00\nD6\n12\n1F\n27\n0F\n06\n03\n01\n1A\n2C\n07\nF1\n13\nD4\nEA\n14\n06\n0A\nFE\nF5\n30\n0E\nEB\nF8\nFA\n04\nD8\n08\n1A\nF8\nEB\n00\nF4\nFA\nFE\nF2\nFD\n17\n09\nF6\n0C\n10\nFC\nED\n1A\nF2\nEF\n21\nFD\n07\n02\nF6\nFC\n13\n08\nF7\n05\n01\nD9\nDA\n17\n0B\nF9\n00\nF5\nDD\nEF\n0A\n07\nF9\nFC\nE5\n0C\n11\n0C\nE6\n03\nF8\nE7\n01\nEA\n02\nD6\nFC\nF3\nFD\nFF\n04\n06\n16\nE6\nFE\n09\nFA\nFA\n00\n06\nEA\n02\n1C\n11\nEF\nF4\nE6\n0A\nFA\n01\nEF\n03\nF9\nE8\nF7\nF5\nFB\nD5\n03\nFE\n15\nFD\n02\n0D\nFD\nF1\n0F\n0D\nE3\n03\n00\n03\nED\n0C\n19\n0F\nFF\n06\nF2\n02\nDB\nF0\nF1\n17\nF4\n0A\nF7\nF6\n0A\nEF\n0A\n0E\n0A\nFE\nFA\n12\nFA\nF8\n02\n08\nF4\n08\n00\nF8\nF6\n09\n15\n16\nFC\n0B\nF9\n15\nDF\nF1\nEE\nFC\n00\nFE\nF9\nFE\nFA\nED\n01\n08\n06\n04\nF1\n00\nFE\n03\nFD\n01\nF8\n08\n00\nFD\nFD\n11\n02\n0D\nFF\n1C\nFC\n14\nF0\nF2\nF6\n03\nFE\nFE\nF8\n13\nFC\nF6\n04\n04\n15\nFB\n05\nEF\n02\nF7\nF3\n06\nEF\nFA\n00\nFA\nFB\n06\n11\n19\nFA\n0E\nF1\n05\nE1\nFF\n08\n0B\nF4\n03\n04\n19\nEB\n04\nFF\n0A\n0A\nFB\nFC\nEE\nFE\n10\n03\nFA\nF8\nF4\n00\n06\n09\n0D\n04\n0E\nFA\n14\nFE\nF4\nFF\nF2\n02\n17\nFC\n18\n03\n23\nE3\n17\n03\n10\n11\n09\n07\nF8\n04\n14\n02\n04\n03\nEC\n00\n08\n05\n11\n1C\n0E\nF6\n0B\n04\nF4\nF5\nE8\nF5\n06\n0A\n14\n03\n19\nF6\n0F\n0A\n09\n0B\nFD\n02\n05\n0A\n0D\n09\nF5\n02\nE7\n00\n0D\n03\n08\n17\n0F\n07\n0A\n04\nEE\nFE\nE0\nF4\n17\nF6\nFB\n07\n0B\n02\n07\n0C\nFF\nFB\n07\nFA\n04\n15\n03\n0D\nFA\nF6\nFB\n00\nFA\n02\n02\n16\n14\n17\n0E\nFB\nF4\n01\nF7\nEA\n1D\nFF\nF9\n06\nFE\nF1\n00\n0B\nFA\nFC\nFA\n02\n08\n19\nFB\n08\n04\nF5\nF9\n00\nFE\n07\n11\n1A\nFF\n0B\n10\nF0\nF0\n05\nF5\nF7\n16\nEE\n0C\n04\n02\n09\nFD\n08\nFE\nF6\n03\nFE\nF7\n01\nF8\n0E\n10\n07\n00\n00\nFF\nEC\n0D\n14\n0F\n07\n0A\nE4\n04\nF3\nF9\nF9\n00\nFD\n04\nFD\n06\n13\nFA\n06\nF4\nEB\nFF\nFC\n0C\n15\n0E\n10\nFB\n12\n05\n00\nF6\nF2\n0F\n16\n02\n11\nFC\nDD\nF2\n02\nEE\n00\n08\n0D\nF5\nFE\n05\n14\nE7\nF3\n06\nF6\n13\n05\nF8\n1A\nFF\n08\n0B\nF8\n0F\n00\nF7\n05\n07\n26\n01\n07\nF9\nEC\nF5\nFC\nF4\n04\nFA\nED\n02\nFE\n0F\n15\nF8\n01\nFC\nFC\nFF\n02\nE6\n07\n00\n10\nF0\nF1\nFF\n00\nF7\nFE\nFB\n21\n04\n1E\n00\nF9\nE3\nF3\nFC\n00\n0D\nD9\n0B\n07\n0A\n0F\nE7\nF4\n03\nF3\nF4\n05\n03\n02\nFC\n08\nEF\nE9\nFE\n00\nFA\nF1\n0B\n0C\nFC\n19\nF1\nE7\nE7\nFF\nF0\n05\n0B\nD6\nEC\nFE\n09\n18\nF3\n0C\n0C\nEC\nEE\n25\nEF\n0D\n12\nF7\n0C\n11\nFF\n00\n03\nF7\n17\n1B\n0F\nFB\nF6\nF1\n0D\nF1\nFA\n03\nFA\nD7\nFB\nFF\n16\n11\nFB\n14\n06\nE3\n02\n10\nD5\nF8\nFE\n02\nF9\nFF\nF6\n00\nEB\nFE\n11\n28\n17\nF4\n03\nFD\n0D\nED\nD5\nDD\nFD\n0B\nFF\nF8\n0F\n19\n07\n14\n16\nED\nF7\nF2\n06\n05\n03\nF4\nDE\n04\nEC\n00\nCB\n09\n29\nEE\nF9\n29\n0C\n0D\nDC\n11\nD9\n1A\n07\n22\nFD\n0B\nFC\n30\nFB\n00\n15\nD4\nE5\n03\n09\nFE\n0C\nCC\nF4\n0B\nF9\n00\n13\nF8\n0B\n0F\n15\n0D\n20\nF6\nE8\nEB\n04\n08\n00\n04\nE9\n11\n0A\nFD\nE3\n29\n1B\nED\nE3\n03\nEF\n0A\n08\nD6\n0B\nF7\n00\n00\n1F\nFD\nF7\n06\n19\nF4\n15\n08\n09\n04\n0E\n11\nFE\n05\n14\nE1\n1C\nF4\nFC\n0F\nF9\nFD\nEF\nFE\nF0\n08\n08\nD7\n00\nE4\n10\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n09\n00\n1A\n0E\n01\nE4\n10\n00\n0B\n00\nF5\n00\nF7\n05\n02\nF7\n04\n14\n0E\n1A\n06\nF3\n11\n0F\n05\nFF\n00\n04\n07\n00\nF6\n00\nF3\n0F\nE4\n3B\n1B\nC7\n17\n00\n14\nF4\n14\nF3\n0B\n26\n02\nD3\n07\nFD\n04\n06\n2B\n07\nF7\nE9\n33\n20\nFD\nFB\n04\nEC\nD1\n00\nEA\n21\n11\n27\n16\nDB\nF7\nFC\n07\n22\n15\nDB\n16\n03\nCD\n05\nFA\n07\n04\nFC\n21\n00\n05\n03\n16\n21\nE4\nF2\n12\n11\nEF\n00\nDD\nF8\n05\n0E\nFF\nFC\n07\nF1\n1C\n01\n0E\nE1\n28\nE7\nEF\nF4\nF3\n04\nDD\nFB\n02\n12\nF6\n17\nFF\n10\nE4\nE1\n2C\n04\n11\n00\nDE\nEE\n00\n12\n01\nEA\n09\nF0\n17\n06\n1D\n06\n0C\nE2\nEE\nF9\nF7\nFB\nE6\n04\nF9\n06\nF1\nFA\n0D\nF5\nDC\nF2\n28\nF8\n15\n00\n03\nF6\n12\n28\n03\nDE\n08\nF1\n0B\n10\n0B\nF5\nFC\nE8\nE6\nFA\n0B\nEB\nE8\n06\n01\nFA\n04\nFD\n0C\n05\nF6\n01\n16\nFE\nFE\n00\nEF\n01\n0D\n1D\nF7\nF2\n15\nFA\n01\nFC\nF6\n05\n25\nFE\nE8\nED\n18\nEC\nFF\n02\n07\n08\nF6\n00\n0F\n03\n06\nF4\n0C\n18\n08\n00\n01\nED\n16\n18\nFA\nFC\n0C\nF8\n0E\nE4\nF7\nFF\n14\n10\nFA\nFC\n18\nEF\nF3\nFA\nFF\nFF\nFD\nF4\n0A\nFD\nEE\nFA\nFC\nFF\nFA\n00\n0B\nFA\n01\n0C\n04\nF9\n0C\nFB\n0E\nF9\nF0\nFB\nFD\nED\nFE\nFF\n1D\nFC\nF6\n05\n0D\n06\n01\n07\n09\nF0\nFB\n00\nF5\nFB\nFE\n00\n03\nFB\nFC\n17\n0F\nFB\n06\nE7\n06\nE6\n03\n08\nFC\nE0\n0B\n03\n0B\nEC\n00\n04\n10\nFE\nF6\nFF\n04\n0A\n05\n0B\n01\n06\nFC\n00\n02\n05\n08\n14\n0C\nF5\n0E\nF9\n06\n02\nFB\nF9\n14\nF9\n15\n0B\n23\nEF\n03\n0A\n09\n04\nF5\nF1\n0E\n07\n16\n10\n08\n10\nEF\n00\nFE\n03\n06\n16\n0E\nF3\n0D\nFC\nF9\nF8\nF0\n0A\n0C\nF9\n04\n02\n16\nE9\nFC\n0F\n01\n05\n02\n00\nFF\n10\n17\n0C\n05\n03\nFC\n00\nF1\n01\nFC\n0C\n06\n09\n18\n05\nFC\n09\nFC\n00\nFF\n02\nF3\n09\n0F\nEA\n08\n0B\n02\n07\nFC\n08\n0A\n09\n0C\n02\n06\n02\n03\n00\nFC\n05\n0A\n14\n0C\n0E\n10\nFE\nF8\nFB\nF9\nFF\n12\n03\n0A\n09\n0A\nE8\n0C\n0D\nFB\nF9\n02\nF8\n0D\n10\nF9\n09\n09\nF8\nF6\n00\nF9\nF4\n0B\n09\n02\n0D\n10\nF0\nF9\n02\n02\nF9\n06\nF5\n14\n06\n12\nF6\n0F\n0E\nF9\nF4\nF3\n0B\n15\n05\n0A\n08\n0A\nFD\nF6\n00\nFA\nF3\n14\n07\n01\n0C\n03\nF6\nF8\n01\n03\nFC\n08\nFB\n0B\n04\n0A\n04\nFA\n0D\nEF\nFB\nF9\n08\n08\n19\n07\n0D\nF6\nFF\nFD\n00\nEF\nF9\n0D\n16\n04\n10\n02\nE4\n01\nF2\nF4\nFF\n01\nF9\nFA\nF4\nFC\nFF\nEC\n0F\nFA\nFB\n00\nEF\nF6\n0D\nFE\nFB\nF3\nF1\n17\n00\n0C\nF7\n02\n12\n0D\n04\nE7\nF4\nFC\nF8\nF4\n0C\n00\nDE\n05\nFA\n0C\nFB\nF6\n0E\nF9\nFD\n04\n0E\nF7\n09\nEE\nF5\n10\nF3\nFE\n00\nFF\n0B\nF9\n17\nF9\n07\nF8\nF8\nFC\nFC\nE0\nFC\n06\nD5\nFD\n06\nFD\n07\nE6\n06\nFE\n02\n09\n04\nE4\n0C\n1B\n07\n03\nF9\n04\n00\nE5\nF0\nEC\nFC\n04\nFD\nE9\nE1\nF5\nF6\nEC\n18\nF9\nD9\n10\n0C\n08\n19\nED\n08\nF3\nF4\nFB\n16\nDD\n0B\n12\n06\n00\n0A\n19\n00\nEC\n01\n07\nF8\n04\nF3\n01\nE8\nFF\nF6\n1D\n06\n24\nD8\n25\n05\n01\nEE\nFB\n16\n07\nFD\n08\n12\nE7\n05\nED\nFE\nEE\n08\n06\n00\nD7\n00\n16\n23\n10\n05\n03\nF2\nF5\nF0\nE0\n03\n1A\n0B\n10\n0A\nF9\nFB\nF3\n0A\n2A\n05\nF5\n00\n0A\nF1\n20\nF8\nCE\n02\nEB\n00\nCC\n0A\n22\nFE\nF2\n08\n06\nFE\n03\nDC\nDB\n14\nDF\nFE\nF5\nFF\nE9\n30\n0A\n0F\n1C\nE5\nE2\n11\nF1\n05\n01\nFF\nF1\n0C\nEE\n00\nF3\n16\n07\nED\nFC\n09\n0C\nEF\nF9\nEB\nF8\nFC\n17\nFD\nFC\n03\nFB\nF5\nFE\n02\n10\nE8\nEF\n08\nF8\n04\nF6\nFA\n06\n07\n04\n00\n07\nEA\nFA\nFE\n09\n14\nFC\n00\nEE\nFD\n01\n03\n01\n00\nFA\n07\nFF\nEC\nED\nFB\n15\n00\nFB\nFD\n00\n00\n00\nF9\n00\nF2\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n02\n00\n02\n17\n00\nFF\n00\nFE\nFE\n0D\nFF\n00\nFF\n00\n00\nED\nF3\n00\nF1\n03\n18\n18\n01\n00\n06\n00\nF8\n12\nF8\nFE\nF5\n00\n06\n03\nF7\n33\nFF\nEB\n0C\n03\n05\nF2\n00\n0C\n04\n05\n03\nEA\nF5\n1B\n01\n1F\n28\n2C\n18\nF6\n0D\n0F\nE8\n1A\nF7\nEC\nD8\n00\n00\n14\nFA\n17\n24\nF6\nFF\nF8\n06\n06\n14\nE5\nF0\nF0\nCF\nF4\nF8\n07\nF6\nFF\n25\n01\n0C\n06\n04\n10\nDC\n03\nF9\nFF\nE5\n00\nFB\nFE\nED\n28\n04\n0B\n1D\nE4\n05\n0D\n08\nF0\nFB\nFD\nD4\nF6\nE8\n09\nD1\n15\n2A\n27\nF7\nFF\n12\nED\nE8\nF8\nF9\nF4\nEB\n00\nEE\n00\n0F\n0A\nF6\nFE\n0F\nEE\nFC\n0A\n11\n0C\n0A\nD3\nE7\n07\n26\nF4\nE6\n17\n24\nF6\nEE\nFB\nF3\nE1\nFC\nD1\n09\n0E\n04\n00\n04\nF2\n03\n21\nE9\nE9\n04\nF6\n04\n07\nFD\n11\nF9\nEE\nF5\nEF\n2D\nF9\nEF\n0D\n11\nFB\n06\n0A\n05\nF5\nF4\nF1\n11\n07\nFF\n00\nF7\nE8\n05\n2D\n03\nFC\n0A\nF8\n05\nFC\nEF\n17\nEA\nEF\nE5\nF0\nF4\nF3\nF5\n01\n15\nF7\n02\n06\n1A\nF7\n02\nF6\nFF\n06\nFD\n00\n08\nFA\n00\n18\n03\nFA\n05\nF2\n10\nE6\nFD\n10\nF6\nEF\nEB\nF1\n0D\nE7\nFC\n09\n02\n02\n0D\n00\n01\nFB\n04\nEE\n01\nF9\n09\n00\nFB\nFC\n01\n17\nFC\nFE\n07\nED\nFD\nE2\n0C\n16\nFC\nF7\nFF\n09\n0A\nEC\nE6\n13\n14\n0F\n09\nFE\n00\n01\nFA\nFA\nFE\nFC\n04\n00\nF1\nFD\n14\n15\nF1\nF0\n24\nE9\nFD\nFB\n04\n07\nF5\n06\n08\n02\n03\n03\nF6\n1E\n1A\n15\n06\n0B\n13\n03\nFA\nFE\nF7\n04\nF5\n00\nFD\n08\n05\n12\n05\nF7\n20\nF7\n05\nEF\nFB\nFE\n06\n06\n05\n02\n04\nEC\n09\n04\n04\nFD\n04\n05\n0F\n09\n0B\nFC\nF6\n01\n01\n00\nFC\n04\n05\n15\n0C\n00\n0D\nFD\n04\nF1\n05\nFB\n0B\nF4\n01\n04\n12\nE4\n04\n00\n13\nFE\n02\n0F\n0C\n14\nFC\n0A\nFA\nFE\nFD\n00\n05\n04\nFC\n10\n07\n0F\n17\n01\n02\nFA\n00\n08\n10\nFC\n00\nF8\n09\nF8\n0A\n04\n0A\n01\nFC\nF3\n0F\n0F\nFA\n06\nF8\nF3\nFB\n00\nF7\n09\n03\n1C\nFF\n11\n05\nFA\nFC\nEF\nF6\n01\n13\nFC\n07\nF7\nFF\nF4\nFB\n0E\nFC\nFD\n02\nF8\n06\n0F\n06\n09\nF1\nF2\nF6\n00\nF1\n01\n09\n16\n01\n10\nFD\nFE\nF3\nED\n06\n00\n03\n02\n06\nF6\n08\nED\n03\nFB\n0C\n07\nEF\n06\n06\n18\n17\n09\nE7\nFE\n06\n00\nE5\n05\n12\n0A\n00\n08\nFA\nF1\nFB\nEC\n08\nF6\n11\nFB\n01\nEE\n04\nE9\n04\n04\nFE\nFA\nF5\nFD\n05\n06\n04\n02\nE0\nF7\n0B\n00\nCF\nEB\n06\n0F\n0D\n08\nF4\nE2\n07\nFF\nF6\nFD\nF2\nEA\n0F\nF7\nF3\nE5\nF2\n01\nF2\n08\nFF\nF6\n06\n01\nF4\n11\nEF\nF2\n11\n00\nED\nFE\n02\n08\n16\n19\nEF\nFC\n01\n0C\nEA\nFE\nFD\nEC\nE9\n00\n02\nF0\n00\nEE\nE4\nFC\n07\nEE\nF5\nFB\n0A\n0A\n00\nFC\n0A\n00\nE4\nFE\nED\n19\n00\n08\nFD\nF9\n05\n06\nE9\nFE\nFD\nD5\nF9\n0C\nF1\n01\nFA\n10\nFD\n06\nFF\nFB\nD7\n15\n02\n1B\nEB\nF8\n09\n00\nF6\n00\nE4\n0C\nFA\n07\nFE\nF0\nF7\nF6\nF3\nFF\nFC\nE0\n16\n17\nFA\n09\nFB\n21\nFD\nFD\nE9\n0C\nF5\n01\nE0\n02\nEF\n10\n25\n00\nEB\nF6\n04\n28\nFF\nF5\n11\nF4\n02\n18\nEA\nC5\nF6\n22\n00\n0F\n0B\n13\n09\n08\nF4\nD9\nFE\n0A\nF8\n10\nF7\n10\nDB\n0E\n10\n00\nE1\nFA\n06\n21\n1C\n04\n00\nED\n1F\nE2\nE3\nF7\nAE\n21\nE9\n08\n07\nF1\n0D\n07\n10\n02\nCA\n05\nED\n07\n15\n11\nE6\n17\n06\n00\nB6\n13\n2D\nF9\nCB\n0C\n15\nF8\nFB\nFC\nDD\n17\nCB\n06\nFA\nF5\n07\n2E\n04\n1C\n24\nFE\nF4\n10\nE9\n02\nFF\n1B\nE5\n09\n10\n00\nED\nFC\n03\nFE\n02\n0D\n0A\nF7\nEE\nEB\n01\nFF\n04\nFF\nED\n09\nF1\nF4\nF3\nFF\n22\nFE\nF1\nFE\n02\nFE\nFD\n01\nFD\n02\n06\n00\n06\nF0\nFE\nFC\nFF\n0D\nFC\n00\nE9\nFC\nF8\n02\n01\n03\nF4\n04\nFE\nF9\nF0\nF9\n10\n00\n08\n0B\nFF\n01\n04\nF3\n00\nF5\n09\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n03\n00\n00\n00\n00\n00\n02\n00\n00\n00\n00\n00\nFE\nFF\n00\n00\n00\n04\n05\n00\n00\n01\n00\n00\n02\nFF\n00\nFE\n00\n00\n00\n10\n14\nF6\n11\nF9\n05\nF6\n05\n0D\n14\nFD\nFF\n00\n12\nFA\nFE\nF9\n16\n15\n17\nFF\n1D\nEE\n09\nDE\n0D\n0B\nF9\nF0\n00\nFF\n02\nFF\nE8\nD4\n1C\n00\nFC\n0B\n15\n10\nE9\nED\n1E\n01\nE2\n34\n15\nFA\n3A\n05\n16\n08\n1B\n08\n0B\nE6\nF7\n0E\nFC\n10\n00\n06\n04\n02\nFA\nE1\n23\n0A\nEA\nF8\nFE\n36\n09\nF1\n17\nEA\nD4\n2C\nFE\nD4\n01\nFE\n1E\nF8\n01\n2F\nEC\nEE\nF4\n22\nF8\n08\n00\n06\nF5\n1C\n14\nEE\n1D\nEE\nFD\nFC\nF6\n0E\n11\nF7\nC6\nFF\nDD\n02\n0D\nD5\n0D\n29\nF6\n04\n00\nF8\nEF\nFA\nFB\n15\n14\n05\n00\nDD\nFE\n06\n15\nE5\nF9\n09\n0A\nF9\n18\n0E\n12\nFF\nC7\nF5\nE8\nF1\nFE\nE0\n0D\n15\n00\n09\nEA\n13\nD9\n02\nFD\n1C\n1F\nF4\n00\nEF\nEA\nFD\n14\nF2\nE5\n1E\nFE\n01\n13\n10\n14\n00\nEE\n0A\nF0\nFF\nF6\nEF\n03\n18\nFC\nF7\n02\n0A\nFC\nF4\nF1\n04\n12\nE2\n00\n03\nF6\nF7\n18\nFB\nDD\n18\nDA\n05\nF9\nFD\n05\nFD\nE0\nF5\nF9\nFA\nFB\n08\nFE\n15\n00\n0A\n00\n05\nF6\nEF\nF7\n05\n02\nED\n00\nFD\nF9\nF5\n0F\nF4\nF2\n0E\nDE\nFF\nFE\n09\n0A\n11\n09\nD7\nF2\n0A\n0A\nE7\nEF\n1E\nFA\n05\nF2\n02\nFF\nEF\nFC\n0B\nFA\nF8\n00\nF4\n03\n13\n0E\nF7\nF0\n07\nF7\n05\nFF\n11\n00\n03\nE8\nEE\nFD\nFD\nF0\nEC\nF1\n11\nF0\nFF\nF6\nFD\n01\n01\n0B\n11\n1E\nF2\n00\nF9\nFA\n06\n16\n06\nFB\n18\nF8\n05\nF2\n0F\nF5\n0E\n00\nFF\nFE\n0B\nE8\nEB\nF9\n0B\nF3\nF7\nFD\n0C\n0C\nF5\n04\nF8\n07\nFA\n00\nE2\n07\nF4\n09\n0A\n04\n00\n12\n01\n02\n26\nFF\n06\nFB\nF4\n0D\nFB\nDD\nF3\nFA\n0A\nF7\n07\nFC\n10\n06\nF2\n14\nFB\n04\nFC\n00\n0E\n01\n08\n0F\n00\nFC\n03\n15\nEC\nFD\n10\n02\n07\nFD\nF6\n00\nFC\nF2\nF3\n0C\n10\nFE\n18\nFF\n03\n00\nF3\n10\nE5\n02\nFE\n00\nF6\nFB\n15\n0C\nF7\n14\n12\n0E\nF2\nFD\nFF\n04\n0B\n0D\n0D\nFC\n0C\nEE\nF9\n10\nF8\nF3\nFE\nEC\n06\n0B\n11\n0E\nEF\nF9\nF3\n00\nFD\nEA\n00\n0E\nFE\n17\n0D\nFD\nE7\n05\nEB\n06\n0B\nFA\n0B\n04\nFB\nEC\n16\nE8\nF7\n02\nFF\nFF\n10\n0D\n03\n27\nD7\n0E\nF9\n00\nFC\n01\n1C\nFF\nEE\n17\n01\nEA\nD1\n0D\nE3\n04\n20\n0E\nF8\n13\n08\nEB\n02\n06\n02\nF3\n0F\n1E\nEE\nF8\nF7\nF9\nE0\nE8\n06\n00\nEB\nFC\n02\n19\n03\n10\n09\nED\nED\nFD\nEA\nF9\nF4\nF2\nF8\n0B\nF5\nF7\nE5\n05\n00\nEE\nF4\nF4\nEF\n09\n09\n10\nF5\nE1\n14\n00\nEB\n12\n14\n01\n0C\n17\n06\nF0\nF7\nF9\nF3\nEE\nFC\nF5\nDA\nFE\n01\nFB\nFF\nF7\nF0\nCD\n0D\nDB\nDF\n1E\n08\n1D\nF0\nF2\n25\n00\nF9\nFC\nF5\nF7\nF9\n2B\n20\nF9\nED\nFF\nF7\nFB\nE1\n08\n27\n1A\nEF\nEE\n09\n0E\n02\nEC\n0A\n00\n04\n17\nEC\n0F\nF9\nF7\n0C\n00\n1D\n00\n23\nFF\nE9\nFA\nFB\nF5\nE0\n06\nE2\nFA\n19\nF3\n0E\n0A\n12\nFC\n02\n09\n14\nE6\n18\nEC\nF5\nF7\nEE\n07\nDB\nF9\n15\n00\n15\nE3\n0A\nF8\n01\nFD\nFA\nF5\nFA\nFA\n00\nE5\nFF\nE7\n1F\nED\nF1\nF7\n16\n14\n0E\nDB\n18\nE3\n18\nF8\nF4\n0D\nF1\n18\n16\n00\nE2\n02\n0A\n00\nF2\n0E\n1D\nF6\n15\n11\nF9\nE0\nD7\n14\n08\nEB\nE4\nEB\n02\n0E\n2E\n12\nF5\nDD\n34\nF0\n21\n09\n11\n15\n0A\n00\nD1\nF7\n2F\n00\nED\nFD\n47\nFB\nF3\n10\nFF\n0E\n06\n0D\nFE\n08\n1A\n02\n05\n2B\n16\nFC\nFE\n1A\n01\nFA\n02\nD4\nDC\nF9\n04\n00\n01\n05\n03\n02\n00\nFB\nFE\n01\n03\nFB\nFA\n01\n0A\nFD\n01\nFD\nFD\n02\n04\nFC\n00\n04\n05\n00\n03\nFB\n01\nFB\n03\nFC\n06\n00\n00\n00\n00\n00\n00\nFF\n00\n00\n01\n00\n00\n00\n02\n00\nFF\nFF\n01\n02\n00\n00\nFF\n00\n00\n00\nFF\n00\n00\n00\n00\n00\n01\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n05\nFD\nFD\n04\n00\n04\n03\nFC\nF9\nFC\n00\n04\nFB\nFC\n09\n00\nFD\n00\n00\n00\n00\n00\nF7\n00\n04\n00\nFD\n00\n00\n00\n00\nF9\nFC\n10\n15\n0A\n05\n00\nF8\n06\n12\n00\nFF\n00\n1B\nFF\nF7\n00\nF7\n06\nF5\nEA\n04\nFE\nFF\n02\nE5\n04\nFD\n04\n00\nE8\n11\n10\nD3\nFC\nFD\nF8\nFF\nDF\n03\n13\n04\nEF\nF0\n09\nF8\n04\n1E\n13\n04\nFD\nF7\n0D\nF9\nF0\nED\nE2\nE0\n34\n21\nE8\n00\nE6\n17\nFD\nD1\nEB\nFC\nE8\nFA\nE6\n05\nFC\nFC\nE9\nFA\n28\nEE\nE6\n1B\nF0\nFB\n25\n17\n12\nFC\n0B\nE2\nD6\n06\n4A\n26\nD5\n00\nDE\n01\n24\n0A\n00\n29\nF9\n0E\nFC\nFE\nF3\n00\nE9\n15\n00\nEC\nFD\n24\nE8\n02\n1A\nFD\n35\n02\nED\n1C\nE0\n03\nF0\n09\nD6\n00\nCB\n08\n22\n07\nEA\n08\n00\n0E\nF7\n1F\nF6\nF5\nED\n29\nEC\n0E\nFF\n0E\nE0\nF9\n13\n0B\n21\nF8\nFF\n0A\n07\n02\n03\n16\n05\n00\nE0\n1F\n12\n04\nDA\n04\nDC\nF0\nEF\n33\nEE\n04\nE6\n11\nFF\n19\n11\n25\nDE\nF3\n08\n0C\n10\n12\nFE\n16\n14\n07\n23\n00\n0B\n00\nF0\nE8\n04\n04\nEE\n05\nDC\nDD\nF8\n0D\nF1\nFC\nF4\nFC\n0C\n2D\n1D\n0E\nF7\nF6\n03\n02\n06\nFA\n16\n07\nFF\n07\n1E\nF2\nE9\n00\nF8\nE8\nFB\n07\nEE\nD2\nF4\nD8\n0D\nFF\n19\nFC\nE7\nF1\n05\n06\n0B\nF6\nF0\n2C\nFD\n03\n18\nFD\n05\nF4\nF6\n2A\n0E\n2D\nDF\n00\n03\n00\n06\n04\nE9\nF0\n02\nEA\n0B\nF4\n0B\n0F\nF5\nFE\nFA\n08\n18\n15\n05\n20\n06\nFA\n12\n05\n09\nEB\n14\n13\n02\n31\nF2\n00\n07\n04\n17\n11\nF7\n12\nFA\n06\nED\n04\n07\n03\nED\n05\nD4\n16\n07\n06\nEE\n03\n0A\n02\n17\n0E\n0B\n0D\nF3\n0E\n07\n0B\nED\n00\nE5\n08\n03\n1C\nFB\n29\nEE\n0D\nF8\n07\n0C\n17\nE5\nF6\nD7\nF6\nFE\n18\nE7\nFF\n1A\n05\n0C\nF9\n19\n0E\nEF\n16\n09\nFB\nF5\n00\nF3\n1C\n0B\n0B\nEE\n19\n02\n15\n01\nEE\nED\n13\nF7\n08\nDD\nF5\nF4\n04\n1A\nFB\nFF\nFE\n05\n07\nFF\n0D\nFA\n12\nEC\n22\n06\n00\nF8\n02\n13\n17\n07\n17\n0C\n0D\nEB\nF6\n02\n0F\nF9\nFA\nE9\n05\n11\n02\n08\nFD\nFD\n08\nF2\n17\n02\n01\nF0\n14\nD6\n1D\nEE\n00\nF5\n14\n0F\n0F\nF7\n03\n09\n05\nE3\n02\nEC\n17\n08\n04\n04\nFB\nFF\n0B\n0A\nD1\n10\n10\nF7\n08\n11\n0A\n06\n33\nE3\n1F\nF7\n00\nEC\n10\n0E\n06\nF4\n0F\n0A\nF5\nCF\n02\nE1\n0F\nDF\nFC\nF9\n14\nEF\nF9\n03\nEF\n04\nF5\nDE\nEE\n05\n03\n21\n28\nD5\n06\nF8\n00\n0F\nF2\n0B\nF6\n08\n1D\nFD\nE9\nEA\n03\nE3\n06\nE8\nE8\nF4\n24\nF5\n00\n06\n12\n08\nFD\nF0\nEC\nE2\nF8\n25\n19\nFE\nFF\nF2\n00\n02\nF0\n18\n06\n04\n0F\n0E\nE5\n15\n0B\nF0\nDD\nF7\n0A\nE9\n0E\nF0\n1C\nF5\n1C\nFE\nC9\nFE\nF9\nD8\n1A\n16\n48\n0A\nEF\nE3\n00\n05\nEF\n15\nF4\nF6\n05\n17\nF8\n0E\n13\nDB\nE0\n1A\n2C\nE4\n06\nF6\n0F\n0C\n1D\n0D\n03\n14\nF2\nE8\n03\n0F\n24\nF1\n03\n17\n00\nE0\nEB\n0C\nE0\n03\n32\n22\nF1\n02\n09\nF2\n05\n3C\n16\nE4\n10\n0B\n21\n04\nFC\n20\nE9\n00\nB9\nF7\nFC\nF1\n03\nCE\n04\n04\n00\n0F\nD5\n05\nE4\n18\n3D\n0F\nEE\nEA\nEF\nFF\nFE\n34\n03\nF8\n12\nF8\n19\nE0\nFD\n34\n00\nDD\nB1\n21\n05\nEE\nD9\nF8\nF4\n01\n00\n10\nEE\n09\n05\n19\n31\n14\nF8\nE4\nFE\n08\n03\n07\n19\nF4\n15\nFD\n00\nE2\n00\n2A\n11\n01\n04\n11\nF5\n08\nDB\n05\nF0\nE2\n00\nF6\nEC\n12\n0A\n14\n27\n0D\nFC\nE7\nF8\n11\n0B\n01\n06\nE6\n11\n00\nF7\nE2\n00\n17\n00\n00\n01\n00\n00\n00\nEC\nFF\nEB\nDE\n00\nFB\n00\n00\n04\nFE\nFE\n03\n00\n03\n01\nFD\nFC\n00\n00\nFF\nFF\nFD\n01\n00\nFE\n03\n05\n00\n00\n03\nFB\n00\n03\nFF\nFF\n02\n00\n00\n00\n00\n00\n01\nFF\n01\n00\n01\nFF\nFF\n00\n00\n00\nFF\nFF\n01\n02\n00\n00\nFE\n00\n00\n00\nFE\n00\n00\nFF\n00\n00\n01\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\nDA\nFA\n06\n00\nF9\n09\n1D\nE6\nE6\nFA\nFF\nEA\n1A\nFF\nEC\n29\n11\n05\nF1\n02\n00\nE1\n20\nE5\n15\n10\nFA\nFD\nE8\n00\nF3\nFA\nCF\n07\n1A\n00\nFF\n19\n29\nEB\nCE\nE4\nF4\nDE\n34\nF7\nD1\n2A\nFE\n05\n25\n16\n0D\nD6\n26\nE8\nF3\n26\nF4\nF7\nDB\n00\nED\nFA\nEA\nE8\n0D\n00\n00\n21\n0E\n01\nED\nEF\nF2\nEF\n28\nFE\nD4\n18\nF7\n04\n1B\n04\n06\nDD\n16\nF2\nE1\n13\n1A\n07\nD1\n00\nD2\nFB\n1F\nDD\nD7\n00\nE1\n14\nF3\n20\n00\nE2\nF2\n20\nF2\n07\n0C\n12\nEC\n0A\nF4\nFD\nE6\nFA\nF3\n1E\n1B\n0D\n26\n12\n0A\n00\n02\nF7\nF8\nE9\nF0\nFF\nDF\n0B\n04\n18\n0C\nD1\n0E\n10\n18\nF3\n28\n27\nFA\n10\nEE\nEF\nEA\n2A\nDE\n20\n16\n10\n08\n27\nFF\n00\n07\n0E\nDD\nF3\nF3\nF2\nF5\nFC\nFB\n11\n0E\nDF\n27\n1F\n04\n08\n2C\n00\n1B\n09\nE9\n13\nEA\n21\nF6\nE8\n1C\n0C\n12\n3C\n03\n00\nFE\n27\nFB\n12\nE2\nEB\n19\nE9\nFB\n2D\n10\nEB\n1B\n45\nF7\nEF\n24\nF4\n00\n10\nF7\n25\n15\n09\n03\nEC\nF6\n13\n1C\n1A\n02\n00\nF3\n15\n0B\n16\nFD\n0F\n1E\nF0\nFD\n18\n22\nEF\n12\n29\nF3\nE8\nF7\n11\nED\nFD\nFA\n1A\n12\nF9\n27\n02\n02\n14\nF0\n04\n14\n00\nD0\n28\nFD\nEF\n02\n12\n02\n00\nFB\n0C\n2F\nF2\nFF\n1A\nF6\nFB\nF0\n19\n03\nF7\n0C\n07\nB4\nF7\n1A\nF4\n1B\n16\nE7\n1C\n02\n00\nFA\n1D\n04\n01\nF5\n23\nF2\n11\n0F\n1D\n21\nF4\n05\n2B\nE3\nFF\nF8\n0D\n02\nF8\n0E\nF4\nD6\n02\n00\nF3\nF8\n16\nED\n18\nCD\n00\nEF\n22\nFA\n12\nD0\n34\nFF\n1B\n17\n2D\nEA\nE3\n13\n18\nF9\nFD\n14\n01\n13\nF8\nF7\n12\nE3\n0B\n15\nEF\n23\n15\n05\n25\nF5\n00\nD7\n00\n0C\n10\nF3\n31\nF3\n01\nE7\n06\nF4\n00\n0A\n11\nE5\n14\n00\n09\nF6\n0A\nFB\n02\n07\n10\n0C\nFB\n13\n00\nFF\n0B\nF3\n00\nE5\n01\nFE\n05\nE8\n20\nF3\nF3\nEF\n1F\nEF\n07\n1C\n15\nE8\n1A\n23\n1F\n07\n0E\n0F\n0E\n16\nE8\n28\nF0\n11\n1D\n08\n10\nEC\n00\n06\n16\nF0\nFC\nEB\n1A\nF6\n02\nFB\n2D\nF5\nF2\n1C\n1C\nDB\n23\n19\n12\n0F\n17\n00\n21\n16\nDE\n45\n07\n0F\n33\nF1\n04\nF5\n00\n05\n07\nF7\nF4\n03\n10\nF4\nFB\n0B\n39\nFD\nF4\n26\n03\nD4\n28\n22\n08\n1B\n13\n05\n2C\n09\nF4\n38\n1A\n13\n2D\nED\n0E\n01\n00\n01\n1D\n2E\nE1\nF3\n1E\n0F\nF5\nED\n30\n15\nFE\n42\n1A\nD6\n25\n19\n07\n02\n0A\nF3\n02\nE0\nF3\nFE\n0C\n10\nFA\nF4\n09\nFD\n00\nFA\n18\n20\nE5\nE8\n2D\n16\nFD\nF4\n47\n03\nE9\n2C\n3C\nE2\n16\n02\n18\nF9\n09\nFE\n0A\nDD\nE4\n03\n06\n01\n09\nFD\n08\nF6\n00\nE3\n12\n12\nF8\nE5\n16\n28\n00\n0A\n24\nF1\nDD\n24\n33\nEB\nF6\n03\n1D\nFF\n07\nF4\n00\nF8\nEB\n00\nF0\nFE\n21\nFC\n16\nFA\n00\nE5\n1A\n0B\n04\nDB\n11\n16\n00\nF3\n21\n09\n02\n1E\n2A\nDE\n08\n00\n05\n01\n06\nE1\n05\nFD\nF4\n02\n00\n06\n02\n0B\n12\nF6\n00\nF1\n08\n03\n03\nF7\n01\n0C\n00\nFF\n12\n01\n00\n02\n0C\nFE\n02\n00\n04\n00\n01\nFE\n01\n00\n00\n00\n00\n02\n00\n00\n00\nFF\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n02\n00\n01\n00\n00\n00\nFE\nFE\n02\n03\n00\nFF\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n03\n00\nFE\n01\n02\n00\n00\n00\n00\n04\n00\n02\n00\n00\n00\nFE\nFE\n03\n04\n00\nFE\nFF\n00\n00\n00\n00\n00\n00\nFF\n00\n00\n00\n05\n00\nFD\n02\n02\n00\n00\nFC\n00\n03\n00\nFF\n00\n00\n00\nFF\nFE\n02\n02\n00\n02\nFE\n00\n00\n02\n01\n00\nFF\nFF\nFD\n00\n00\n04\n00\nFD\n02\n02\n00\n00\nED\n00\n01\n00\nF4\n00\n00\n00\n04\n00\nFD\nF5\n00\n13\nFA\n01\n00\n0A\n05\n00\nFE\nFE\nEF\n00\n00\n01\n03\n01\n02\n01\n00\n00\nED\n01\n05\n00\nF4\n00\nFC\n00\n03\n00\nFE\nF9\n04\n14\nF8\n01\n00\n0B\n05\n00\nFC\nFB\nF0\n00\n00\n02\n03\nFF\n03\n02\n00\n00\nE4\nFF\n06\nFD\nF7\n02\nF2\n00\nFE\nFD\n02\nFF\n09\n03\nFC\n00\n00\n19\n01\n00\nFF\nEC\nFD\n00\n06\n02\n11\nFE\n02\n02\n07\n00\nD7\n18\n01\nF0\nDE\n0E\nE0\n00\n05\nEE\nFF\nFA\n12\n2D\nF1\n1C\n05\n31\n0F\n00\n03\n01\nD9\n0D\n08\n06\n26\n04\nFF\n0C\n0D\n00\nDA\n13\n06\nF7\nF2\n15\nE1\n01\nFD\nF7\n05\nFB\n0D\n20\nF4\n17\n08\n1D\n05\n00\nFC\n03\nDD\n0A\n08\nFF\n22\nFC\n01\n06\n09\n00\nE1\n04\n06\nF8\nFE\n0E\nED\n00\nFC\n03\n08\n07\n08\n07\nFE\n0E\n0A\n0E\n04\n00\nFE\nF2\nF7\n04\n01\nFD\n0C\nFA\n02\n07\n00\n00\nE2\n00\n07\nFF\nF8\n00\nF8\n02\n00\n0B\n01\n09\n03\n04\n02\n02\n01\n0F\n05\n00\n08\nFF\nF7\n01\n07\n09\n03\nFE\nFE\n03\n02\n00\nC7\n28\n13\n0D\nD5\n10\nE3\n18\nE9\n1B\n08\n03\n30\n1F\nF1\n06\n00\n32\n13\n00\n0A\nF7\nF2\n00\n27\n17\n09\nF7\nFB\n1C\n09\n00\nE6\n11\nF4\n1E\nD2\nF7\n10\nFD\nDC\nE8\nF3\nF0\n0A\n0A\n21\n1A\n00\n1B\n0B\n00\nF9\n13\n02\n00\n34\n12\nFF\n09\n01\n0F\n26\n00\n25\nFF\nEA\nFD\nE3\n0C\n0F\nFC\nE5\n0B\n01\nFF\nFE\n1D\nF6\n10\n00\nF4\n0C\n00\nE8\nFD\n00\n00\n07\n08\n05\nF8\n0C\n0C\n17\n00\n10\n0D\n12\nEE\nF9\n12\nEB\n00\nF3\n0B\n10\n26\n06\n0B\nE5\n19\n00\nEF\n10\n00\nE4\nD7\nEB\n01\n00\n06\n13\nE8\n07\n10\nFC\n00\nFC\n1D\nFD\nFF\nDE\n13\nFD\n00\n10\n16\nF7\nFF\n01\n02\n06\n13\n00\n14\n1F\n00\nFA\nF4\nD9\n00\n1D\nED\n1C\n04\n01\n17\n0D\n00\nFE\n1B\n07\n00\nEB\n08\n0B\n00\n0D\n03\nF8\n02\n0A\nFC\n0B\n0A\n00\n19\n21\n00\nF4\nFE\nFE\n00\n02\nF7\n01\nFD\n00\n14\n10\n00\nFE\n08\n07\n00\nF8\n08\nFE\n00\n00\nFE\n02\n09\n10\nFE\nFC\n04\n00\nFD\n10\n00\nFA\n00\n00\n00\n00\nFF\n00\nFA\nFF\n0A\n04\n00\n00\n1C\n0F\n00\nEE\n09\n0A\n00\nF0\n18\n0E\n12\n05\n17\nE3\n01\n00\nDE\n08\n00\nE5\n00\n00\n00\n00\n00\n00\nF9\n00\n0C\nFB\n00\n00\n16\n05\n00\nF6\n04\n0A\n00\nFA\n14\n06\n05\n00\n14\nEC\nFE\n00\nEE\n05\n00\nEC\n00\n00\nF1\n00\n00\n00\n00\n00\n06\nFE\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n");
    $fclose(f1);

    f2 = $fopen("w2.mem", "w");
    $fwrite(f2, "F5\nFF\n29\n03\nF2\n23\n2E\n0B\nF4\nA8\n1C\n29\n16\n08\nEA\nAE\nC9\n25\nEA\n18\nCD\n03\n35\n15\nD2\n09\nC8\n17\nD8\nD7\n11\n09\n1F\n14\nC8\n14\n13\nC2\n1F\nF5\nFF\nFD\nFB\nE8\n0A\n12\n1A\nE7\n1E\nD5\nEF\n10\nBE\nF4\n08\n30\n18\n19\nF0\n08\n25\nDF\n18\nF8\nB9\n08\n02\nF2\nFD\n16\nDE\nF8\n12\nD3\nFB\nE9\n0B\n17\nE1\n22\n13\nE8\n0E\nE8\n01\nD7\nFA\nEB\n16\n09\n25\n97\nFC\n28\nB1\nF0\n2D\n01\nE3\n11\n26\nF0\nF7\n10\n04\n15\nCA\n1B\n18\nFC\n00\n29\nDA\nD3\n31\nFF\nF9\n38\nD3\nE3\n0D\n4C\nE4\nDE\n03\nE2\n0D\n23\nAA\nFA\n10\n0D\nE6\n19\nA1\n36\nFA\n07\nF7\n13\n19\nB2\nED\n1A\n1A\nDF\n0B\nDD\nDC\n02\nBB\nE4\nDC\nF5\nEC\n46\n19\n20\nF8\nF2\n21\n08\n0A\nF4\n81\nF2\n07\n17\nF5\nF5\nDC\n09\n30\nEB\n03\nFB\nF7\nB9\nE3\n1C\n15\nE1\n13\nC5\n19\nC1\n09\n13\n0C\n14\nFF\nC7\n20\n16\nFD\n0C\nB7\n11\nE5\nFF\nA7\nBE\nE1\n28\n05\n30\nC4\nDB\nDA\n09\nA6\nE5\nB7\n37\n24\n22\n89\nDD\nE3\n34\nD6\n27\n06\n23\n14\nBD\n0C\n14\nE2\nD2\nE9\n3A\n19\n1D\nEA\nE4\nDB\n2C\nE0\n81\n12\nF4\nB8\n04\n0E\n2D\n22\nEA\nFD\n18\nF2\n25\n1F\n09\nB8\n00\n0C\nFD\n1C\n8F\nCE\n1F\nF8\nB1\n11\nFC\nFF\nFD\n05\n2C\nDB\nEB\nF2\n1F\n05\nF9\nFB\nF2\n24\n13\nE3\n2A\nC3\n02\n18\nD2\nC8\n20\nEB\n17\nC3\nE0\nFF\nFF\n1D\nF0\nCF\n20\n0B\n14\n09\n18\n1E\nE0\n27\nA2\nA8\n05\nF0\n17\n00\n00\n00\n00\n00\n00\n00\n00\n00\n00\n");
    $fclose(f2);
  end
endmodule

// ===== mac_unit.v =====
// =============================================================================
// Module: mac_unit
// Project: EcrioniX Mini AI Accelerator Studio
// Description: Multiply-Accumulate (MAC) Engine for INT8 Neural Network Inference
//
// Operation:
//   acc_out <= (clear_acc) ? init_val :
//              (mac_en)    ? acc_out + ($signed({1'b0, act_in}) * weight_in) :
//                            acc_out;
// =============================================================================

`timescale 1ns / 1ps

module mac_unit (
    input  wire               clk,
    input  wire               rst_n,
    input  wire               clear_acc,    // When high, resets/reloads accumulator with init_val
    input  wire signed [31:0] init_val,     // Bias value to initialize accumulator
    input  wire               mac_en,       // Enable multiply and accumulate
    input  wire        [7:0]  act_in,       // Unsigned 8-bit activation (pixel or hidden neuron)
    input  wire signed [7:0]  weight_in,    // Signed 8-bit weight (-128 to +127)
    output reg  signed [31:0] acc_out,      // Signed 32-bit accumulated sum
    output wire signed [16:0] mult_out      // Combinational product for inspection
);

    // Unsigned activation is zero-extended to signed 9-bit operand:
    wire signed [8:0] act_signed = $signed({1'b0, act_in});

    // 9-bit signed * 8-bit signed = 17-bit signed product (range: -32640 to +32385)
    assign mult_out = act_signed * weight_in;

    // Sequential Accumulator Register
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            acc_out <= 32'sd0;
        end else if (clear_acc) begin
            acc_out <= init_val;
        end else if (mac_en) begin
            acc_out <= acc_out + $signed({{15{mult_out[16]}}, mult_out});
        end
    end

endmodule


// ===== relu_unit.v =====
// =============================================================================
// Module: relu_unit
// Project: EcrioniX Mini AI Accelerator Studio
// Description: Rectified Linear Unit (ReLU) with Power-of-Two Quantization Shift
//
// Operation:
//   ReLU(x) = max(0, x)
//   Quantized: min(255, max(0, acc_in >>> SHIFT_BITS))
// =============================================================================

`timescale 1ns / 1ps

module relu_unit #(
    parameter SHIFT_BITS = 10
)(
    input  wire signed [31:0] acc_in,      // Signed 32-bit accumulator from MAC unit
    output wire        [7:0]  act_out      // Unsigned 8-bit quantized activation (0 to 255)
);

    // Arithmetic right-shift preserves sign:
    wire signed [31:0] shifted = acc_in >>> SHIFT_BITS;

    // ReLU suppression and saturation clamp to [0, 255]:
    assign act_out = (acc_in <= 32'sd0)      ? 8'd0 :
                     (shifted > 32'sd255)    ? 8'd255 :
                                               shifted[7:0];

endmodule


// ===== argmax_unit.v =====
// =============================================================================
// Module: argmax_unit
// Project: EcrioniX Mini AI Accelerator Studio
// Description: Argmax Unit for 10-Class Classification Output
//
// Finds the maximum score among 10 output neurons:
//   predicted_digit = argmax_{k=0..9} (score[k])
// =============================================================================

`timescale 1ns / 1ps

module argmax_unit (
    input  wire               clk,
    input  wire               rst_n,
    input  wire               start_argmax,    // Initializes comparison registers
    input  wire signed [31:0] score_in,        // Score from output layer MAC
    input  wire        [3:0]  score_idx,       // Index of current score (0 to 9)
    input  wire               score_valid,     // Strobe indicating score_in is valid
    output reg         [3:0]  predicted_digit, // Winning class index (0 to 9)
    output reg  signed [31:0] max_score,       // Highest output score
    output reg                argmax_done      // High when all 10 classes processed
);

    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            predicted_digit <= 4'd0;
            max_score       <= -32'sd2147483648; // Minimum 32-bit signed integer
            argmax_done     <= 1'b0;
        end else if (start_argmax) begin
            predicted_digit <= 4'd0;
            max_score       <= -32'sd2147483648;
            argmax_done     <= 1'b0;
        end else if (score_valid) begin
            if (score_idx == 4'd0 || score_in > max_score) begin
                max_score       <= score_in;
                predicted_digit <= score_idx;
            end
            if (score_idx == 4'd9) begin
                argmax_done     <= 1'b1;
            end
        end
    end

endmodule


// ===== input_buffer.v =====
// =============================================================================
// Module: input_buffer
// Project: EcrioniX Mini AI Accelerator Studio
// Description: 784 x 8-bit Dual-Port Synchronous RAM for 28x28 Input Image
// =============================================================================

`timescale 1ns / 1ps

module input_buffer (
    input  wire        clk,
    input  wire        write_en,
    input  wire [9:0]  write_addr,    // 0 to 783
    input  wire [7:0]  write_data,
    input  wire [9:0]  read_addr,     // 0 to 783
    output reg  [7:0]  read_data
);

    reg [7:0] mem [0:783];

    // Synchronous Write
    always @(posedge clk) begin
        if (write_en) begin
            mem[write_addr] <= write_data;
        end
    end

    // Synchronous Read
    always @(posedge clk) begin
        read_data <= mem[read_addr];
    end

endmodule


// ===== hidden_buffer.v =====
// =============================================================================
// Module: hidden_buffer
// Project: EcrioniX Mini AI Accelerator Studio
// Description: 32 x 8-bit Dual-Port Synchronous RAM for Hidden Layer Activations
// =============================================================================

`timescale 1ns / 1ps

module hidden_buffer (
    input  wire       clk,
    input  wire       write_en,
    input  wire [4:0] write_addr,    // 0 to 31
    input  wire [7:0] write_data,
    input  wire [4:0] read_addr,     // 0 to 31
    output reg  [7:0] read_data
);

    reg [7:0] mem [0:31];

    always @(posedge clk) begin
        if (write_en) begin
            mem[write_addr] <= write_data;
        end
    end

    always @(posedge clk) begin
        read_data <= mem[read_addr];
    end

endmodule


// ===== bias_memory.v =====
// =============================================================================
// Module: bias_memory
// Project: EcrioniX Mini AI Accelerator Studio
// Description: Synthesizable ROM for Trained Neural Network Biases
//
// Layer 1: 32 signed 32-bit biases (b1)
// Layer 2: 10 signed 32-bit biases (b2)
// =============================================================================

`timescale 1ns / 1ps

module bias_memory (
    input  wire        [4:0]  b1_addr,    // 0 to 31
    output reg  signed [31:0] b1_data,
    input  wire        [3:0]  b2_addr,    // 0 to 9
    output reg  signed [31:0] b2_data
);

    // Layer 1 Biases (Combinational ROM)
    always @(*) begin
        case (b1_addr)
            5'd0: b1_data = 32'sd8024;
            5'd1: b1_data = 32'sd675;
            5'd2: b1_data = 32'sd-6751;
            5'd3: b1_data = 32'sd3341;
            5'd4: b1_data = 32'sd14929;
            5'd5: b1_data = 32'sd-3453;
            5'd6: b1_data = 32'sd3120;
            5'd7: b1_data = 32'sd-4649;
            5'd8: b1_data = 32'sd573;
            5'd9: b1_data = 32'sd-3579;
            5'd10: b1_data = 32'sd4734;
            5'd11: b1_data = 32'sd7637;
            5'd12: b1_data = 32'sd1841;
            5'd13: b1_data = 32'sd-2500;
            5'd14: b1_data = 32'sd-7885;
            5'd15: b1_data = 32'sd-2119;
            5'd16: b1_data = 32'sd-3381;
            5'd17: b1_data = 32'sd2960;
            5'd18: b1_data = 32'sd2341;
            5'd19: b1_data = 32'sd-8531;
            5'd20: b1_data = 32'sd287;
            5'd21: b1_data = 32'sd-4000;
            5'd22: b1_data = 32'sd-5143;
            5'd23: b1_data = 32'sd-4246;
            5'd24: b1_data = 32'sd2316;
            5'd25: b1_data = 32'sd2570;
            5'd26: b1_data = 32'sd5639;
            5'd27: b1_data = 32'sd-2313;
            5'd28: b1_data = 32'sd-6949;
            5'd29: b1_data = 32'sd4492;
            5'd30: b1_data = 32'sd453;
            5'd31: b1_data = 32'sd-763;
            default: b1_data = 32'sd0;
        endcase
    end

    // Layer 2 Biases (Combinational ROM)
    always @(*) begin
        case (b2_addr)
            4'd0: b2_data = 32'sd-368;
            4'd1: b2_data = 32'sd1;
            4'd2: b2_data = 32'sd87;
            4'd3: b2_data = 32'sd-595;
            4'd4: b2_data = 32'sd709;
            4'd5: b2_data = 32'sd256;
            4'd6: b2_data = 32'sd76;
            4'd7: b2_data = 32'sd-132;
            4'd8: b2_data = 32'sd198;
            4'd9: b2_data = 32'sd-175;
            default: b2_data = 32'sd0;
        endcase
    end

endmodule


// ===== weight_memory.v =====
// =============================================================================
// Module: weight_memory
// Project: EcrioniX Mini AI Accelerator Studio
// Description: Synthesizable Dual-Port ROM for Neural Network Weights
//
// Layer 1 Weights (W1): 784 x 32 = 25,088 signed INT8 weights
// Layer 2 Weights (W2): 32 x 10 = 320 signed INT8 weights
// =============================================================================

`timescale 1ns / 1ps

module weight_memory (
    input  wire               clk,
    input  wire        [14:0] w1_addr,    // 0 to 25087 (i*32 + j)
    output reg  signed [7:0]  w1_data,
    input  wire        [8:0]  w2_addr,    // 0 to 319 (j*10 + k)
    output reg  signed [7:0]  w2_data
);

    reg signed [7:0] w1_mem [0:25087];
    reg signed [7:0] w2_mem [0:319];

    initial begin
        $readmemh("w1.mem", w1_mem);
        $readmemh("w2.mem", w2_mem);
    end

    // Synchronous reads (1 cycle latency matching standard synchronous SRAM/BRAM)
    always @(posedge clk) begin
        w1_data <= w1_mem[w1_addr];
        w2_data <= w2_mem[w2_addr];
    end

endmodule


// ===== ai_controller.v =====
// =============================================================================
// Module: ai_controller
// Project: EcrioniX Mini AI Accelerator Studio
// Description: Finite State Machine (FSM) Controller for Mini AI Accelerator
//
// Sequences Layer 1 (784x32 MACs), ReLU activation, Layer 2 (32x10 MACs),
// and Argmax output classification.
// =============================================================================

`timescale 1ns / 1ps

module ai_controller (
    input  wire        clk,
    input  wire        rst_n,
    input  wire        start,               // Pulse to trigger accelerator inference
    output reg         busy,                // High during inference execution
    output reg         done,                // High upon inference completion
    output reg  [3:0]  state,               // Current FSM state for visualization

    // Input Buffer Read Interface
    output reg  [9:0]  pixel_addr,          // 0 to 783

    // Hidden Buffer Interface
    output reg         hidden_buf_we,       // Write enable for hidden layer activation
    output reg  [4:0]  hidden_buf_waddr,    // Write address (0 to 31)
    output reg  [4:0]  hidden_buf_raddr,    // Read address (0 to 31)

    // Weight Memory Address
    output reg  [14:0] w1_addr,             // 0 to 25087 (i * 32 + j)
    output reg  [8:0]  w2_addr,             // 0 to 319   (j * 10 + k)

    // Bias Memory Address
    output reg  [4:0]  b1_addr,             // 0 to 31
    output reg  [3:0]  b2_addr,             // 0 to 9

    // MAC Engine Controls
    output reg         mac_clear,           // Initialize accumulator with bias
    output reg         mac_en,              // Enable multiply-accumulate
    output reg         mac_layer_sel,       // 0 = Layer 1 (pixel * W1), 1 = Layer 2 (hidden * W2)

    // Argmax Unit Interface
    output reg         start_argmax,        // Reset argmax comparison
    output reg  [3:0]  score_idx,           // Output class index (0 to 9)
    output reg         score_valid          // Strobe when output score is ready
);

    // State Encoding
    localparam [3:0]
        ST_IDLE         = 4'd0,
        ST_INIT_HIDDEN  = 4'd1,
        ST_PIPE_HIDDEN  = 4'd2,
        ST_HIDDEN_MAC   = 4'd3,
        ST_HIDDEN_ACT   = 4'd4,
        ST_INIT_OUTPUT  = 4'd5,
        ST_PIPE_OUTPUT  = 4'd6,
        ST_OUTPUT_MAC   = 4'd7,
        ST_OUTPUT_STORE = 4'd8,
        ST_ARGMAX       = 4'd9,
        ST_DONE         = 4'd10;

    // Internal Loop Counters
    reg [4:0] neuron_j;     // Current hidden neuron: 0 to 31
    reg [9:0] pixel_i;      // Current input pixel: 0 to 783
    reg [3:0] class_k;      // Current output class: 0 to 9
    reg [4:0] hidden_j;     // Current hidden activation: 0 to 31

    // FSM State Transition & Datapath Control
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            state            <= ST_IDLE;
            busy             <= 1'b0;
            done             <= 1'b0;
            neuron_j         <= 5'd0;
            pixel_i          <= 10'd0;
            class_k          <= 4'd0;
            hidden_j         <= 5'd0;
            pixel_addr       <= 10'd0;
            hidden_buf_we    <= 1'b0;
            hidden_buf_waddr <= 5'd0;
            hidden_buf_raddr <= 5'd0;
            w1_addr          <= 15'd0;
            w2_addr          <= 9'd0;
            b1_addr          <= 5'd0;
            b2_addr          <= 4'd0;
            mac_clear        <= 1'b0;
            mac_en           <= 1'b0;
            mac_layer_sel    <= 1'b0;
            start_argmax     <= 1'b0;
            score_idx        <= 4'd0;
            score_valid      <= 1'b0;
        end else begin
            // Default strobe deassertions
            mac_clear     <= 1'b0;
            mac_en        <= 1'b0;
            hidden_buf_we <= 1'b0;
            start_argmax  <= 1'b0;
            score_valid   <= 1'b0;

            case (state)

                // -------------------------------------------------------------
                // IDLE: Wait for start signal
                // -------------------------------------------------------------
                ST_IDLE: begin
                    busy <= 1'b0;
                    done <= 1'b0;
                    if (start) begin
                        busy         <= 1'b1;
                        neuron_j     <= 5'd0;
                        pixel_i      <= 10'd0;
                        b1_addr      <= 5'd0;
                        start_argmax <= 1'b1;
                        state        <= ST_INIT_HIDDEN;
                    end
                end

                // -------------------------------------------------------------
                // INIT_HIDDEN: Clear accumulator with bias for neuron_j
                // -------------------------------------------------------------
                ST_INIT_HIDDEN: begin
                    b1_addr       <= neuron_j;
                    mac_clear     <= 1'b1;
                    mac_layer_sel <= 1'b0;  // Layer 1 mode
                    pixel_i       <= 10'd0;
                    pixel_addr    <= 10'd0;
                    w1_addr       <= neuron_j; // (0 * 32) + neuron_j
                    state         <= ST_PIPE_HIDDEN;
                end

                // -------------------------------------------------------------
                // PIPE_HIDDEN: Wait 1 cycle for synchronous RAM read latency
                // -------------------------------------------------------------
                ST_PIPE_HIDDEN: begin
                    // Pixel 0 and W1[0, j] are now reading out of memory
                    pixel_i    <= 10'd1;
                    pixel_addr <= 10'd1;
                    w1_addr    <= 32 + neuron_j; // (1 * 32) + neuron_j
                    state      <= ST_HIDDEN_MAC;
                end

                // -------------------------------------------------------------
                // HIDDEN_MAC: Accumulate 784 pixel * weight products
                // -------------------------------------------------------------
                ST_HIDDEN_MAC: begin
                    mac_en <= 1'b1;
                    if (pixel_i < 10'd784) begin
                        pixel_i    <= pixel_i + 10'd1;
                        pixel_addr <= pixel_i;
                        w1_addr    <= (pixel_i * 32) + neuron_j;
                    end else begin
                        // Completed all 784 inputs for this neuron
                        mac_en <= 1'b1; // Register the 783rd product
                        state  <= ST_HIDDEN_ACT;
                    end
                end

                // -------------------------------------------------------------
                // HIDDEN_ACT: Store quantized ReLU activation in hidden_buffer
                // -------------------------------------------------------------
                ST_HIDDEN_ACT: begin
                    hidden_buf_we    <= 1'b1;
                    hidden_buf_waddr <= neuron_j;
                    if (neuron_j < 5'd31) begin
                        neuron_j <= neuron_j + 5'd1;
                        state    <= ST_INIT_HIDDEN;
                    end else begin
                        // All 32 hidden neurons computed! Move to Layer 2
                        class_k  <= 4'd0;
                        state    <= ST_INIT_OUTPUT;
                    end
                end

                // -------------------------------------------------------------
                // INIT_OUTPUT: Clear accumulator with bias for class_k
                // -------------------------------------------------------------
                ST_INIT_OUTPUT: begin
                    b2_addr          <= class_k;
                    mac_clear        <= 1'b1;
                    mac_layer_sel    <= 1'b1; // Layer 2 mode
                    hidden_j         <= 5'd0;
                    hidden_buf_raddr <= 5'd0;
                    w2_addr          <= class_k; // (0 * 10) + class_k
                    state            <= ST_PIPE_OUTPUT;
                end

                // -------------------------------------------------------------
                // PIPE_OUTPUT: Wait 1 cycle for synchronous RAM read latency
                // -------------------------------------------------------------
                ST_PIPE_OUTPUT: begin
                    hidden_j         <= 5'd1;
                    hidden_buf_raddr <= 5'd1;
                    w2_addr          <= 10 + class_k; // (1 * 10) + class_k
                    state            <= ST_OUTPUT_MAC;
                end

                // -------------------------------------------------------------
                // OUTPUT_MAC: Accumulate 32 hidden_act * weight products
                // -------------------------------------------------------------
                ST_OUTPUT_MAC: begin
                    mac_en <= 1'b1;
                    if (hidden_j < 5'd32) begin
                        hidden_j         <= hidden_j + 5'd1;
                        hidden_buf_raddr <= hidden_j;
                        w2_addr          <= (hidden_j * 10) + class_k;
                    end else begin
                        mac_en <= 1'b1; // Register 31st product
                        state  <= ST_OUTPUT_STORE;
                    end
                end

                // -------------------------------------------------------------
                // OUTPUT_STORE: Present score_k to Argmax unit
                // -------------------------------------------------------------
                ST_OUTPUT_STORE: begin
                    score_valid <= 1'b1;
                    score_idx   <= class_k;
                    if (class_k < 4'd9) begin
                        class_k <= class_k + 4'd1;
                        state   <= ST_INIT_OUTPUT;
                    end else begin
                        // All 10 classes scored!
                        state   <= ST_ARGMAX;
                    end
                end

                // -------------------------------------------------------------
                // ARGMAX: Finalize winning prediction
                // -------------------------------------------------------------
                ST_ARGMAX: begin
                    state <= ST_DONE;
                end

                // -------------------------------------------------------------
                // DONE: Assert completion flag
                // -------------------------------------------------------------
                ST_DONE: begin
                    busy <= 1'b0;
                    done <= 1'b1;
                    if (start) begin
                        // Start next inference if triggered
                        busy         <= 1'b1;
                        done         <= 1'b0;
                        neuron_j     <= 5'd0;
                        pixel_i      <= 10'd0;
                        b1_addr      <= 5'd0;
                        start_argmax <= 1'b1;
                        state        <= ST_INIT_HIDDEN;
                    end
                end

                default: state <= ST_IDLE;
            endcase
        end
    end

endmodule


// ===== mini_ai_accelerator_top.v =====
// =============================================================================
// Module: mini_ai_accelerator_top
// Project: EcrioniX Mini AI Accelerator Studio
// Description: Top-Level Neural Network Hardware Accelerator for Digit Inference
//
// Architecture: 784 Inputs (INT8) -> 32 Hidden (ReLU UINT8) -> 10 Output (INT32) -> Argmax
// =============================================================================

`timescale 1ns / 1ps

module mini_ai_accelerator_top #(
    parameter SHIFT_BITS = 10
)(
    input  wire               clk,
    input  wire               rst_n,

    // Host Pixel Input Write Interface
    input  wire               pixel_in_we,      // High when host writes a pixel
    input  wire        [9:0]  pixel_in_addr,    // Pixel write index (0 to 783)
    input  wire        [7:0]  pixel_in_data,    // Grayscale pixel intensity (0 to 255)

    // Inference Control
    input  wire               start,            // Start inference pulse
    output wire               busy,             // Accelerator busy
    output wire               done,             // Inference complete

    // Classification Result
    output wire        [3:0]  predicted_digit,  // Argmax result (0 to 9)
    output wire signed [31:0] max_score,        // Winning class score

    // Diagnostic Probes for Visualizer & Waveforms
    output wire        [3:0]  fsm_state,
    output wire signed [31:0] debug_acc,
    output wire signed [16:0] debug_mult,
    output wire        [7:0]  debug_relu,
    output wire        [9:0]  debug_pixel_addr,
    output wire        [14:0] debug_w1_addr,
    output wire        [8:0]  debug_w2_addr
);

    // Internal Interconnect Signals
    wire [9:0]  ctrl_pixel_addr;
    wire        ctrl_hidden_we;
    wire [4:0]  ctrl_hidden_waddr;
    wire [4:0]  ctrl_hidden_raddr;
    wire [14:0] ctrl_w1_addr;
    wire [8:0]  ctrl_w2_addr;
    wire [4:0]  ctrl_b1_addr;
    wire [3:0]  ctrl_b2_addr;
    wire        ctrl_mac_clear;
    wire        ctrl_mac_en;
    wire        ctrl_mac_layer_sel;
    wire        ctrl_start_argmax;
    wire [3:0]  ctrl_score_idx;
    wire        ctrl_score_valid;

    // Memory Read Data
    wire        [7:0]  pixel_ram_out;
    wire        [7:0]  hidden_ram_out;
    wire signed [7:0]  w1_data;
    wire signed [7:0]  w2_data;
    wire signed [31:0] b1_data;
    wire signed [31:0] b2_data;

    // MAC Engine Interconnects
    wire signed [31:0] mac_init_val;
    wire        [7:0]  mac_act_in;
    wire signed [7:0]  mac_weight_in;
    wire signed [31:0] mac_acc_out;
    wire signed [16:0] mac_mult_out;

    // ReLU Output
    wire        [7:0]  relu_act_out;

    // Multiplex MAC inputs based on Layer 1 vs Layer 2
    // Layer 1: act = pixel_ram_out, weight = w1_data, bias = b1_data
    // Layer 2: act = hidden_ram_out, weight = w2_data, bias = b2_data
    assign mac_act_in    = (ctrl_mac_layer_sel == 1'b0) ? pixel_ram_out : hidden_ram_out;
    assign mac_weight_in = (ctrl_mac_layer_sel == 1'b0) ? w1_data       : w2_data;
    assign mac_init_val  = (ctrl_mac_layer_sel == 1'b0) ? b1_data       : b2_data;

    // Diagnostics assignments
    assign fsm_state        = ctrl_state;
    wire [3:0] ctrl_state;
    assign debug_acc        = mac_acc_out;
    assign debug_mult       = mac_mult_out;
    assign debug_relu       = relu_act_out;
    assign debug_pixel_addr = ctrl_pixel_addr;
    assign debug_w1_addr    = ctrl_w1_addr;
    assign debug_w2_addr    = ctrl_w2_addr;

    // 1. Controller FSM
    ai_controller u_ctrl (
        .clk              (clk),
        .rst_n            (rst_n),
        .start            (start),
        .busy             (busy),
        .done             (done),
        .state            (ctrl_state),
        .pixel_addr       (ctrl_pixel_addr),
        .hidden_buf_we    (ctrl_hidden_we),
        .hidden_buf_waddr (ctrl_hidden_waddr),
        .hidden_buf_raddr (ctrl_hidden_raddr),
        .w1_addr          (ctrl_w1_addr),
        .w2_addr          (ctrl_w2_addr),
        .b1_addr          (ctrl_b1_addr),
        .b2_addr          (ctrl_b2_addr),
        .mac_clear        (ctrl_mac_clear),
        .mac_en           (ctrl_mac_en),
        .mac_layer_sel    (ctrl_mac_layer_sel),
        .start_argmax     (ctrl_start_argmax),
        .score_idx        (ctrl_score_idx),
        .score_valid      (ctrl_score_valid)
    );

    // 2. Input Buffer (Dual-Port RAM: Host Write Port + Controller Read Port)
    input_buffer u_input_buf (
        .clk        (clk),
        .write_en   (pixel_in_we),
        .write_addr (pixel_in_addr),
        .write_data (pixel_in_data),
        .read_addr  (ctrl_pixel_addr),
        .read_data  (pixel_ram_out)
    );

    // 3. Hidden Buffer (Dual-Port RAM: Layer 1 Write Port + Layer 2 Read Port)
    hidden_buffer u_hidden_buf (
        .clk        (clk),
        .write_en   (ctrl_hidden_we),
        .write_addr (ctrl_hidden_waddr),
        .write_data (relu_act_out),
        .read_addr  (ctrl_hidden_raddr),
        .read_data  (hidden_ram_out)
    );

    // 4. Weight Memory ROM
    weight_memory u_weights (
        .clk     (clk),
        .w1_addr (ctrl_w1_addr),
        .w1_data (w1_data),
        .w2_addr (ctrl_w2_addr),
        .w2_data (w2_data)
    );

    // 5. Bias Memory ROM
    bias_memory u_biases (
        .b1_addr (ctrl_b1_addr),
        .b1_data (b1_data),
        .b2_addr (ctrl_b2_addr),
        .b2_data (b2_data)
    );

    // 6. MAC Unit
    mac_unit u_mac (
        .clk       (clk),
        .rst_n     (rst_n),
        .clear_acc (ctrl_mac_clear),
        .init_val  (mac_init_val),
        .mac_en    (ctrl_mac_en),
        .act_in    (mac_act_in),
        .weight_in (mac_weight_in),
        .acc_out   (mac_acc_out),
        .mult_out  (mac_mult_out)
    );

    // 7. ReLU Unit
    relu_unit #(
        .SHIFT_BITS (SHIFT_BITS)
    ) u_relu (
        .acc_in  (mac_acc_out),
        .act_out (relu_act_out)
    );

    // 8. Argmax Unit
    argmax_unit u_argmax (
        .clk             (clk),
        .rst_n           (rst_n),
        .start_argmax    (ctrl_start_argmax),
        .score_in        (mac_acc_out),
        .score_idx       (ctrl_score_idx),
        .score_valid     (ctrl_score_valid),
        .predicted_digit (predicted_digit),
        .max_score       (max_score),
        .argmax_done     ()
    );

endmodule


// ===== tb_mini_ai_accelerator.v =====
// =============================================================================
// Testbench: tb_mini_ai_accelerator
// Project: EcrioniX Mini AI Accelerator Studio
// Description: Automated Verification Testbench for Digit Classification
// =============================================================================

`timescale 1ns / 1ps

module tb_mini_ai_accelerator;

    reg         clk;
    reg         rst_n;
    reg         pixel_in_we;
    reg  [9:0]  pixel_in_addr;
    reg  [7:0]  pixel_in_data;
    reg         start;

    wire        busy;
    wire        done;
    wire [3:0]  predicted_digit;
    wire signed [31:0] max_score;
    wire [3:0]  fsm_state;
    wire signed [31:0] debug_acc;
    wire signed [16:0] debug_mult;
    wire [7:0]  debug_relu;
    wire [9:0]  debug_pixel_addr;
    wire [14:0] debug_w1_addr;
    wire [8:0]  debug_w2_addr;

    integer cycles;

    // Instantiate Device Under Test (DUT)
    mini_ai_accelerator_top #(
        .SHIFT_BITS(10)
    ) dut (
        .clk              (clk),
        .rst_n            (rst_n),
        .pixel_in_we      (pixel_in_we),
        .pixel_in_addr    (pixel_in_addr),
        .pixel_in_data    (pixel_in_data),
        .start            (start),
        .busy             (busy),
        .done             (done),
        .predicted_digit  (predicted_digit),
        .max_score        (max_score),
        .fsm_state        (fsm_state),
        .debug_acc        (debug_acc),
        .debug_mult       (debug_mult),
        .debug_relu       (debug_relu),
        .debug_pixel_addr (debug_pixel_addr),
        .debug_w1_addr    (debug_w1_addr),
        .debug_w2_addr    (debug_w2_addr)
    );

    // 100 MHz Clock Generation (10ns period)
    always #5 clk = ~clk;

    initial begin
        // Setup Waveform Dump
        $dumpfile("dump.vcd");
        $dumpvars(0, tb_mini_ai_accelerator);

        // Initialize signals
        clk           = 0;
        rst_n         = 0;
        pixel_in_we   = 0;
        pixel_in_addr = 0;
        pixel_in_data = 0;
        start         = 0;
        cycles        = 0;

        $display("==================================================================");
        $display("   EcrioniX Mini AI Accelerator Studio - Verilog RTL Testbench   ");
        $display("==================================================================");

        // Apply Reset
        #20;
        rst_n = 1;
        #10;
        $display("[TIME: %0t ns] Reset deasserted. Loading 28x28 pixel image for Digit %0d...", $time, 7);

        // Load 784 pixels
        pixel_in_we = 1;
      pixel_in_addr = 10'd0; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd1; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd2; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd3; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd4; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd5; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd6; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd7; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd8; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd9; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd10; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd11; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd12; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd13; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd14; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd15; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd16; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd17; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd18; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd19; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd20; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd21; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd22; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd23; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd24; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd25; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd26; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd27; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd28; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd29; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd30; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd31; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd32; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd33; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd34; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd35; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd36; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd37; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd38; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd39; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd40; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd41; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd42; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd43; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd44; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd45; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd46; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd47; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd48; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd49; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd50; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd51; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd52; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd53; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd54; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd55; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd56; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd57; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd58; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd59; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd60; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd61; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd62; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd63; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd64; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd65; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd66; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd67; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd68; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd69; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd70; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd71; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd72; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd73; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd74; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd75; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd76; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd77; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd78; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd79; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd80; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd81; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd82; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd83; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd84; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd85; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd86; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd87; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd88; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd89; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd90; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd91; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd92; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd93; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd94; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd95; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd96; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd97; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd98; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd99; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd100; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd101; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd102; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd103; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd104; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd105; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd106; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd107; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd108; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd109; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd110; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd111; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd112; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd113; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd114; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd115; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd116; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd117; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd118; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd119; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd120; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd121; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd122; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd123; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd124; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd125; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd126; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd127; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd128; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd129; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd130; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd131; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd132; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd133; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd134; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd135; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd136; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd137; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd138; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd139; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd140; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd141; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd142; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd143; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd144; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd145; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd146; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd147; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd148; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd149; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd150; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd151; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd152; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd153; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd154; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd155; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd156; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd157; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd158; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd159; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd160; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd161; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd162; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd163; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd164; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd165; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd166; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd167; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd168; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd169; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd170; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd171; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd172; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd173; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd174; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd175; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd176; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd177; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd178; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd179; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd180; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd181; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd182; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd183; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd184; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd185; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd186; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd187; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd188; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd189; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd190; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd191; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd192; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd193; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd194; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd195; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd196; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd197; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd198; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd199; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd200; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd201; pixel_in_data = 8'd2; #10;
      pixel_in_addr = 10'd202; pixel_in_data = 8'd13; #10;
      pixel_in_addr = 10'd203; pixel_in_data = 8'd13; #10;
      pixel_in_addr = 10'd204; pixel_in_data = 8'd48; #10;
      pixel_in_addr = 10'd205; pixel_in_data = 8'd133; #10;
      pixel_in_addr = 10'd206; pixel_in_data = 8'd133; #10;
      pixel_in_addr = 10'd207; pixel_in_data = 8'd133; #10;
      pixel_in_addr = 10'd208; pixel_in_data = 8'd133; #10;
      pixel_in_addr = 10'd209; pixel_in_data = 8'd140; #10;
      pixel_in_addr = 10'd210; pixel_in_data = 8'd254; #10;
      pixel_in_addr = 10'd211; pixel_in_data = 8'd254; #10;
      pixel_in_addr = 10'd212; pixel_in_data = 8'd255; #10;
      pixel_in_addr = 10'd213; pixel_in_data = 8'd225; #10;
      pixel_in_addr = 10'd214; pixel_in_data = 8'd191; #10;
      pixel_in_addr = 10'd215; pixel_in_data = 8'd93; #10;
      pixel_in_addr = 10'd216; pixel_in_data = 8'd8; #10;
      pixel_in_addr = 10'd217; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd218; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd219; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd220; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd221; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd222; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd223; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd224; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd225; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd226; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd227; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd228; pixel_in_data = 8'd14; #10;
      pixel_in_addr = 10'd229; pixel_in_data = 8'd161; #10;
      pixel_in_addr = 10'd230; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd231; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd232; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd233; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd234; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd235; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd236; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd237; pixel_in_data = 8'd254; #10;
      pixel_in_addr = 10'd238; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd239; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd240; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd241; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd242; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd243; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd244; pixel_in_data = 8'd156; #10;
      pixel_in_addr = 10'd245; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd246; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd247; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd248; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd249; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd250; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd251; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd252; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd253; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd254; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd255; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd256; pixel_in_data = 8'd25; #10;
      pixel_in_addr = 10'd257; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd258; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd259; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd260; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd261; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd262; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd263; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd264; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd265; pixel_in_data = 8'd254; #10;
      pixel_in_addr = 10'd266; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd267; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd268; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd269; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd270; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd271; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd272; pixel_in_data = 8'd217; #10;
      pixel_in_addr = 10'd273; pixel_in_data = 8'd15; #10;
      pixel_in_addr = 10'd274; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd275; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd276; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd277; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd278; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd279; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd280; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd281; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd282; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd283; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd284; pixel_in_data = 8'd20; #10;
      pixel_in_addr = 10'd285; pixel_in_data = 8'd235; #10;
      pixel_in_addr = 10'd286; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd287; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd288; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd289; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd290; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd291; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd292; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd293; pixel_in_data = 8'd254; #10;
      pixel_in_addr = 10'd294; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd295; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd296; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd297; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd298; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd299; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd300; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd301; pixel_in_data = 8'd24; #10;
      pixel_in_addr = 10'd302; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd303; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd304; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd305; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd306; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd307; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd308; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd309; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd310; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd311; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd312; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd313; pixel_in_data = 8'd157; #10;
      pixel_in_addr = 10'd314; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd315; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd316; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd317; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd318; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd319; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd320; pixel_in_data = 8'd224; #10;
      pixel_in_addr = 10'd321; pixel_in_data = 8'd252; #10;
      pixel_in_addr = 10'd322; pixel_in_data = 8'd181; #10;
      pixel_in_addr = 10'd323; pixel_in_data = 8'd90; #10;
      pixel_in_addr = 10'd324; pixel_in_data = 8'd169; #10;
      pixel_in_addr = 10'd325; pixel_in_data = 8'd101; #10;
      pixel_in_addr = 10'd326; pixel_in_data = 8'd239; #10;
      pixel_in_addr = 10'd327; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd328; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd329; pixel_in_data = 8'd24; #10;
      pixel_in_addr = 10'd330; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd331; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd332; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd333; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd334; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd335; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd336; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd337; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd338; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd339; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd340; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd341; pixel_in_data = 8'd38; #10;
      pixel_in_addr = 10'd342; pixel_in_data = 8'd60; #10;
      pixel_in_addr = 10'd343; pixel_in_data = 8'd60; #10;
      pixel_in_addr = 10'd344; pixel_in_data = 8'd60; #10;
      pixel_in_addr = 10'd345; pixel_in_data = 8'd60; #10;
      pixel_in_addr = 10'd346; pixel_in_data = 8'd60; #10;
      pixel_in_addr = 10'd347; pixel_in_data = 8'd60; #10;
      pixel_in_addr = 10'd348; pixel_in_data = 8'd32; #10;
      pixel_in_addr = 10'd349; pixel_in_data = 8'd57; #10;
      pixel_in_addr = 10'd350; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd351; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd352; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd353; pixel_in_data = 8'd18; #10;
      pixel_in_addr = 10'd354; pixel_in_data = 8'd211; #10;
      pixel_in_addr = 10'd355; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd356; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd357; pixel_in_data = 8'd24; #10;
      pixel_in_addr = 10'd358; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd359; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd360; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd361; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd362; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd363; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd364; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd365; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd366; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd367; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd368; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd369; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd370; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd371; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd372; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd373; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd374; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd375; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd376; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd377; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd378; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd379; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd380; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd381; pixel_in_data = 8'd102; #10;
      pixel_in_addr = 10'd382; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd383; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd384; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd385; pixel_in_data = 8'd24; #10;
      pixel_in_addr = 10'd386; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd387; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd388; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd389; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd390; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd391; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd392; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd393; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd394; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd395; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd396; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd397; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd398; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd399; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd400; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd401; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd402; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd403; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd404; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd405; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd406; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd407; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd408; pixel_in_data = 8'd19; #10;
      pixel_in_addr = 10'd409; pixel_in_data = 8'd209; #10;
      pixel_in_addr = 10'd410; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd411; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd412; pixel_in_data = 8'd216; #10;
      pixel_in_addr = 10'd413; pixel_in_data = 8'd15; #10;
      pixel_in_addr = 10'd414; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd415; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd416; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd417; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd418; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd419; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd420; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd421; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd422; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd423; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd424; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd425; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd426; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd427; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd428; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd429; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd430; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd431; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd432; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd433; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd434; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd435; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd436; pixel_in_data = 8'd101; #10;
      pixel_in_addr = 10'd437; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd438; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd439; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd440; pixel_in_data = 8'd156; #10;
      pixel_in_addr = 10'd441; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd442; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd443; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd444; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd445; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd446; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd447; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd448; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd449; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd450; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd451; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd452; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd453; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd454; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd455; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd456; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd457; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd458; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd459; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd460; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd461; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd462; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd463; pixel_in_data = 8'd35; #10;
      pixel_in_addr = 10'd464; pixel_in_data = 8'd250; #10;
      pixel_in_addr = 10'd465; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd466; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd467; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd468; pixel_in_data = 8'd41; #10;
      pixel_in_addr = 10'd469; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd470; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd471; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd472; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd473; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd474; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd475; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd476; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd477; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd478; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd479; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd480; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd481; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd482; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd483; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd484; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd485; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd486; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd487; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd488; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd489; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd490; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd491; pixel_in_data = 8'd158; #10;
      pixel_in_addr = 10'd492; pixel_in_data = 8'd255; #10;
      pixel_in_addr = 10'd493; pixel_in_data = 8'd254; #10;
      pixel_in_addr = 10'd494; pixel_in_data = 8'd254; #10;
      pixel_in_addr = 10'd495; pixel_in_data = 8'd163; #10;
      pixel_in_addr = 10'd496; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd497; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd498; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd499; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd500; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd501; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd502; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd503; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd504; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd505; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd506; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd507; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd508; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd509; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd510; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd511; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd512; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd513; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd514; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd515; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd516; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd517; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd518; pixel_in_data = 8'd26; #10;
      pixel_in_addr = 10'd519; pixel_in_data = 8'd212; #10;
      pixel_in_addr = 10'd520; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd521; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd522; pixel_in_data = 8'd246; #10;
      pixel_in_addr = 10'd523; pixel_in_data = 8'd43; #10;
      pixel_in_addr = 10'd524; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd525; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd526; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd527; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd528; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd529; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd530; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd531; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd532; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd533; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd534; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd535; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd536; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd537; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd538; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd539; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd540; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd541; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd542; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd543; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd544; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd545; pixel_in_data = 8'd8; #10;
      pixel_in_addr = 10'd546; pixel_in_data = 8'd212; #10;
      pixel_in_addr = 10'd547; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd548; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd549; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd550; pixel_in_data = 8'd163; #10;
      pixel_in_addr = 10'd551; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd552; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd553; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd554; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd555; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd556; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd557; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd558; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd559; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd560; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd561; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd562; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd563; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd564; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd565; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd566; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd567; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd568; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd569; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd570; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd571; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd572; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd573; pixel_in_data = 8'd36; #10;
      pixel_in_addr = 10'd574; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd575; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd576; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd577; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd578; pixel_in_data = 8'd60; #10;
      pixel_in_addr = 10'd579; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd580; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd581; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd582; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd583; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd584; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd585; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd586; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd587; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd588; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd589; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd590; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd591; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd592; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd593; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd594; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd595; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd596; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd597; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd598; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd599; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd600; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd601; pixel_in_data = 8'd162; #10;
      pixel_in_addr = 10'd602; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd603; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd604; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd605; pixel_in_data = 8'd239; #10;
      pixel_in_addr = 10'd606; pixel_in_data = 8'd46; #10;
      pixel_in_addr = 10'd607; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd608; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd609; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd610; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd611; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd612; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd613; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd614; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd615; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd616; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd617; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd618; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd619; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd620; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd621; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd622; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd623; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd624; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd625; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd626; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd627; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd628; pixel_in_data = 8'd93; #10;
      pixel_in_addr = 10'd629; pixel_in_data = 8'd254; #10;
      pixel_in_addr = 10'd630; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd631; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd632; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd633; pixel_in_data = 8'd101; #10;
      pixel_in_addr = 10'd634; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd635; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd636; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd637; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd638; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd639; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd640; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd641; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd642; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd643; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd644; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd645; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd646; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd647; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd648; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd649; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd650; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd651; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd652; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd653; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd654; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd655; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd656; pixel_in_data = 8'd162; #10;
      pixel_in_addr = 10'd657; pixel_in_data = 8'd254; #10;
      pixel_in_addr = 10'd658; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd659; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd660; pixel_in_data = 8'd214; #10;
      pixel_in_addr = 10'd661; pixel_in_data = 8'd14; #10;
      pixel_in_addr = 10'd662; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd663; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd664; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd665; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd666; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd667; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd668; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd669; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd670; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd671; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd672; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd673; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd674; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd675; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd676; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd677; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd678; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd679; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd680; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd681; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd682; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd683; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd684; pixel_in_data = 8'd242; #10;
      pixel_in_addr = 10'd685; pixel_in_data = 8'd254; #10;
      pixel_in_addr = 10'd686; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd687; pixel_in_data = 8'd239; #10;
      pixel_in_addr = 10'd688; pixel_in_data = 8'd69; #10;
      pixel_in_addr = 10'd689; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd690; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd691; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd692; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd693; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd694; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd695; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd696; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd697; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd698; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd699; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd700; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd701; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd702; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd703; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd704; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd705; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd706; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd707; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd708; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd709; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd710; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd711; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd712; pixel_in_data = 8'd190; #10;
      pixel_in_addr = 10'd713; pixel_in_data = 8'd254; #10;
      pixel_in_addr = 10'd714; pixel_in_data = 8'd253; #10;
      pixel_in_addr = 10'd715; pixel_in_data = 8'd165; #10;
      pixel_in_addr = 10'd716; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd717; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd718; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd719; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd720; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd721; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd722; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd723; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd724; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd725; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd726; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd727; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd728; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd729; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd730; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd731; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd732; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd733; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd734; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd735; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd736; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd737; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd738; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd739; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd740; pixel_in_data = 8'd6; #10;
      pixel_in_addr = 10'd741; pixel_in_data = 8'd138; #10;
      pixel_in_addr = 10'd742; pixel_in_data = 8'd184; #10;
      pixel_in_addr = 10'd743; pixel_in_data = 8'd51; #10;
      pixel_in_addr = 10'd744; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd745; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd746; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd747; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd748; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd749; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd750; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd751; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd752; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd753; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd754; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd755; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd756; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd757; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd758; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd759; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd760; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd761; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd762; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd763; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd764; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd765; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd766; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd767; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd768; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd769; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd770; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd771; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd772; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd773; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd774; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd775; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd776; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd777; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd778; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd779; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd780; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd781; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd782; pixel_in_data = 8'd0; #10;
      pixel_in_addr = 10'd783; pixel_in_data = 8'd0; #10;
        pixel_in_we = 0;
        $display("[TIME: %0t ns] All 784 pixels successfully loaded into input buffer.", $time);

        // Trigger Accelerator Inference
        #10;
        start = 1;
        #10;
        start = 0;
        $display("[TIME: %0t ns] Start strobe asserted. Accelerator running inference...", $time);

        // Monitor execution
        while (!done) begin
            @(posedge clk);
            cycles = cycles + 1;
            if (cycles % 5000 == 0) begin
                $display("[CYCLE: %0d] Processing... Current FSM State = %0d | Acc = %0d", cycles, fsm_state, debug_acc);
            end
        end

        #20;
        $display("==================================================================");
        $display("                  INFERENCE EXECUTION COMPLETED                   ");
        $display("==================================================================");
        $display("  Target Ground Truth Digit : %0d", 7);
        $display("  Accelerator Prediction    : %0d", predicted_digit);
        $display("  Winning Class Max Score   : %0d", max_score);
        $display("  Total Clock Cycles        : %0d cycles", cycles);
        $display("  Hardware Latency @ 100MHz : %0.2f us", (cycles * 10.0) / 1000.0);
        $display("==================================================================");

        if (predicted_digit == 7) begin
            $display(">>> TEST PASSED: Hardware RTL inference matched target class %0d exactly! <<<", 7);
        end else begin
            $display(">>> TEST FAILED: Expected %0d, got %0d <<<", 7, predicted_digit);
        end

        $finish;
    end

endmodule

