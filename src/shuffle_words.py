#!/bin/python3
import random

# Just a simple script to shuffle the candidate words to some random order.
file = open('candidateWords.tsx', 'tr+')
file.seek(0)
lines = file.readlines()

head = lines[:1]
body = lines[1:-3]
tail = lines[-3:]

random.shuffle(body)

file.seek(0)
file.writelines(head)
file.writelines(body)
file.writelines(tail)