from bs4 import BeautifulSoup
import requests
import shutil
from time import sleep
import json
def func(link):
    weapon_name:str = link.split('/')[-1]
    weapon_name = weapon_name.replace('+',' ')
    page = requests.get(link).text
    soup = BeautifulSoup(page,'lxml')
    a = soup.find_all('a')
    img = [x.find_all('img') for x in a]
    img_bez_powtorek = []
    for b in img:
        if len(b) > 0:
          img_bez_powtorek.append(b)  
    weap_dict={}    
    for p in img_bez_powtorek:
        if weapon_name in str(p) and 'csgostash' not in str(p):
            src = p[0].attrs['src']
            alt = p[0].attrs['alt']
            weap_dict[alt]=src
    return weap_dict

def downloadImage(link,name):
    path = f'images/{name}.png'
    r = requests.get(link, stream=True)
    if r.status_code == 200:
        with open(path, 'wb') as f:
            r.raw.decode_content = True
            shutil.copyfileobj(r.raw, f)
            return path
    else:
        print('chuj Ci w dupe nie ma 200')
   


if __name__=='__main__':
    # b=func('https://csgostash.com/weapon/Nomad+Knife')
    # for key,val in b.items():
    #     downloadImage(val,key)
    with open('linki','r') as f:
        a = f.read().splitlines()
        b =[]
        paths = {}
        for link in a:
            di = func(link)
            b.append(di)
            sleep(1)
        for d in b:
            for key,value in d.items():
                print(f'{key}:{value}')
                path = downloadImage(value,key)
                paths[key]=path
        f.close()
    json_object = json.dumps(paths, indent = 2)  
    with open('weapons.json','w+') as w:
        w.write(json_object)

    


    