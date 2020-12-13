# TODO-list
Software rendszerek tervezése projekt leírás

1.	Bevezetés a projektbe, leírás

 	Projektünk célja egy feladatlista létrehozása, mely segítségével egy XXI. századi ember könnyedén eligazodik a feladatai közt. 
	A feladatokat amint megkapja, bevezeti felületre, akár az applikáció, akár a weboldal segítségével. 
	Amikor az adott feladatot el kell végeznie, a program figyelmeztet és értesítést küld. 
	A felület egy demo, egy felhasználóra van elkészítve, de ezt tovább lehet vinni több felhasználóra, 
	akik regisztrálhatnak és nem látják egymás feladatait, nem is szerkeszthetik azokat, tehát csak saját profiljukat kezelhetik. 
	Elsősorban egy Firebase adatbázist hoztunk létre, ahol tárolódik minden elvégzett és nem elvégzett feladat. 
	Ezt ha tovább folytatnánk, akkor itt tárolódna a felhasználók neve és jelszava, ezen belül pedig a feladatkör. 
	Ez az adatbázis elérhető Android applikációról, valamint weboldalról is egyaránt. 
	Ezután neki fogunk mint az Android, mint pedig a weboldal elkészítéséhez.
	
	Használata a következőképpen történik: 
	Ha az app/weboldal ha meg van nyitva értesítést küld az aznapi tevékenységekről.
	Felsorolja azokat, vesszővel elválasztva. 
	A felhaasználó hozzáadhat egy eseményt, dátummal párosítva. 
	Ha valamelyik részt nem tölti ki egy ablak jön elő, ami jelzi a helyztelen adatbevitelt és így nem adhat hozzá feladatot. 
	Ha hozzáadtunk egy eseményt az megjelenik a folyamatban lévő tevékenységek részben.
	Itt az eseményt lehet szerkeszteni, mint név és mint idő szempontjából is.
	Az eseményt lehet törölni. Valamint hozzá lehe tadni a befejezett események listájához. 
	A befejezett eseményeket lehet törölni vagy visszavonni a nem elvégzettek közé.
	Ha a hozzáadott tevékenység régebbi, mint az aznapi időpont, akkor a léjárt események listájába kerül.
	Itt szintén lehet törölni vagy hozzáadni az elvégzett eseményekhez. 
	
2.	Feladatok kiosztása

  A feladatokat 3 személy végzi:
  
    •	Kántor Hunor-Ákos 		--> Android
    
    •	Nagy Hunor-Zalán 		--> Web
    
    •	Teutsch Mihály-Richárd 		--> Adatbázis
    
  3.	Műveletek, feladatok leírása
  
    ♦ Firebase database:
    
    - Táblák: 

    ♦ Androdid application:
    
    - Aktivity-k:
    
    - Form-ok: 

    ♦ Webpage:
    
	A weboldal elkészítéséhez nincs szükségünk semmi féle nagy méretű applikációhoz, akár egy sima Notepad-ban is elkészíthető, 
	és bármilyen browser segítségével futtatható az. 
	Jómagam, Visual Studio Code-ot használtam, amihez telepítettem néhany extension-t, amik segítik/segítették munkám. 
	Három, illetve három féle file típust használtam a weboldal megvalósításához (html, csss, js). 
	A weboldal értsítést küld, ha van aktuális napi tevékenység. 
	Az oldal újra tölti magát 5 percenként, így ha még mindig van aktuális tevékenység újra értesít. 
   
    -  TO DO LIST page: https://pojecttodolist.netlify.app/
    
    - index.html, index.js, index.css
    
    - Használt adatbátis: Firebase -->
    
    Project name: form
    
    App name: ToDoList  -->  unfinished_ToDo, finished_ToDo  -->  date, key, title
    
    Az adatbázishoz való kapcsolodási JavaScript kód: 
    
var firebaseConfig = {

    apiKey: "AIzaSyAsn_dWrZNB1bRVul_XkgRWFgjEIusPKl8",
    
    authDomain: "form-8954e.firebaseapp.com",
    
    databaseURL: "https://form-8954e.firebaseio.com",
    
    projectId: "form-8954e",
    
    storageBucket: "form-8954e.appspot.com",
    
    messagingSenderId: "347245119398",
    
    appId: "1:347245119398:web:21766531a808a3d8ad7167",
    
    measurementId: "G-C2LWPVJQFG"
    
};

firebase.initializeApp(firebaseConfig);

    - JavaScript függvények: 
    
    •	CustomAlert: Saját alert létrehozására szolgál, ezt html tag-ekkel oldja meg.
    
    •	add_todo: Ellenőrzi a beírt, megadott adat helyességét, majd ha mgefelel, 
    hozzáaddja az adatbázishoz és kiirja a képernyőre.
    
    •	create_unfinished_ToDo: Betöltődik, amint elindul a weboldal. 
    Előszőr kitőrli a To Do List és az Expired List tartalmát, majd lekéri az unfinished_ToDo adatait az adatbázisből, azt berakja egy tömbe és
    kiírja a képernyőre. Ha az adat régebbi az aktuális időnél, akkor az Expired Listbe rakja, ellenben pedig a To Do Listbe.
    
    •	create_finished_ToDo: Betöltődik, amint elindul a weboldal. 
    Előszőr kitőrli a Finished List tartalmát, majd lekéri a finished_ToDo adatait az adatbázisből, azt berakja egy tömbe és minden adatot
    kiír a képernyőre. 
    
    •	todo_done: Valamelyik eseménynél a plusszra kattintva hívodik meg. 
    Az adott eseményt kitőrli a To Do List-ről és áthelyezi a Finished listába. 
    Mindezt a képernyőn és az adatbázisban is eggyaránt. 
    
    •	todo_minus: Valamelyik eseménynél a minusszra kattintva hívodik meg. 
    Az adott eseményt kitőrli a Finished listából és áthelyezi a To Do List-be. 
    Mindezt a képernyőn és az adatbázisban is eggyaránt.
    
    •	todo_edit: Valamelyik eseménynél a ceruzára kattintva hívodik meg. 
    Ha szerkeszteni akarunk egy eseményt, akkor hívódik meg. 
    Engedélyezi a szerkesztést. 
    
    •	finish_edit: Ha befejezősőtt a szerkesztés, akkor lezérja azt és frissíti az adatbázist is.
    
    •	todo_delete: Valamelyik eseménynél a szemetes kukára kattintva hívodik meg. 
    Töröl az adatbázisból és a képernyőről is eggyaránt. 
    
    •	updateClock: Frissíti az aktuális órát folyamatosan. 
    
    •	initClock: Betöltődik, amint elindul a weboldal. 
    Elindítja az aktuális órát és kiírja azt a képernyore. 
    
    - html rész felépítése:
    
    •	head: meta, link/style és script.
    
    •	body: 
    
     ♥ Első rész: cím, illetve aktuális időt.
     
     ♥ Második rész: saját alert (rejtve van), adat feltöltési lehetőségek.
     
     ♥ Harmadik rész: A To Do List.
     
     ♥ Negyedik rész: A Finished.
     
     ♥ Ötödik rész: Az Experied List.
     
    •	footer: Évszám mutatása JavaScript kódot használva.
    
    - css rész felépítése:
    
    • direkt hivatkozások 
    
    • id-k
    
    • class-ek
    
    • felülírás: calendar, scrollbar
    
    Miután a weboldal teljesen kész közzé teszem az interneten, de ingyenes domaint csak úgy szerezhetek, 
    ha egy platformot használok, ami ingyenes domaint, illetve tárhelyet biztosít.
    Hátulütője annyi, hogy az url címet nem teljesen szekeszthetem, hozzá teszi a maga "reklámját". 
    Használt platform: https://www.netlify.com/
    
    - használt ikonok: 
   
      •	   to-do-list.png;
      
      •    valamint egy nyilt forrású kódból (https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css):
      
      	♥ fa fa-arrow-circle-right
	
	♥ fa fa-plus
	
	♥ fa fa-pencil
	
	♥ fa fa-trash
	
	♥ fa fa-minus
	
	♥ fa fa-check
    
  4.	Design
  
  A design rész css(web), illetve xml(Android) fileokban történt.
  
  •	színek:
  
  - háttér: #86db35, #4d4646, #f5eaea, #4d4646, #10101E
  
  - betű:  #fff, #000, grey
  
  - gomb: #36b353, #75b79e, #ffed83, #c42a2a, #4d4646
    
  •	betűtípus: monospace, Segoe UI
  
  •	gombok: 4 különböző: 
  
  - add: A To Do List-hez elemet ad hozzá. Dátum és név formájában. (Enter)
  
  - done: A To Do List-ből elemet helyez át a Finished List-be (Plusz)
  
  - delete: Töröl a teljes adatbázisból. (Kuka)
  
  - edit: Szerkesztés lehetőségét adja meg. Dátum, illetve név. (Ceruza)
  
  - minus: Elemet helyez át az Expired List-ből a Finished List-be. 
  Ide akkor kerül elem a To Do List-ből, ha az aktuális dátumhoz képest a kurrens elem dátuma már a múltnak tekinthető.  (Minus)
  
  •	képek: to-do-list.png  --> A kép az applikáció, illetve a weboldal icon-ja.
  
  •	alert-ek, illetve toast-ok használata!
  
  •	Érdekességek: Az applikáció, illetve a weboldal mutatja az aktuális időt.
 
