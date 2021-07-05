from collections import Counter

def word_count(filename):
    with open(filename, 'r', errors='ignore') as f:
        c = Counter()
        for line in f:
            c.update(line.strip().split(' '))
        return c

files = ['Alice-in-Wonderland.txt','chap-06v2_part1.txt','Course_admin.txt','Distributed_Election_OK.txt','Distributed_Indexing_OK.txt','Fault_Tolerance.txt','Introduction.txt','LargeScaleDistributedSystems.txt','Lewis-Carroll.txt','MapReduce_Hadoop_concepts.txt','Replication_WAN_OK.txt','selll.txt']
counters = [word_count(filename) for filename in files]

# counters content (example):
# [Counter({'world': 2, 'foo': 2, 'bar': 2, 'hello': 2, 'baz': 1}),
#  Counter({'foo': 5, 'world': 2, 'bar': 2, 'hello': 2, 'baz': 1})]

# Add all the word counts together:
total = sum(counters, Counter())  # sum needs an empty counter to start with

# total content (example):
# Counter({'foo': 7, 'world': 4, 'bar': 4, 'hello': 4, 'baz': 2})
print (total)