a = []
with open('linki','r+') as f:
    for line in f.read().splitlines():
        if line not in a:
            a.append(line)  
    f.close()
with open('linki', 'w+') as f:
    for item in a:
        f.write(f'{item}\n')    
