
# Recipy: share your recipes around the world

Recipy è una web app dove le persone possono condividere delle ricette, includendo il nome della ricetta, la nazionalità del piatto, la foto, e la descrizione (ovvero gli ingredienti e il procedimento), molto come un social media (ispirato a Reddit/TikTok).


## Tecnologie Usate

Per questo progetto, ho deciso di utilizzare le seguenti tecnologie:

- Frontend:
    - **Vue.js** (Integrato con **TypeScript**)
    - **Vite**
    - **Bootstrap**
    - **SCSS**

- Backend:
    - **TypeScript**
    - **Node.js**
    - **Express**
    - **MySQL**
    - **Multer (per gestire le immagini)**
    - XAMPP (hosting database)


## Fase Di Progettazione

Recipy è stato progettato per essere mobile first a causa della sua natura intrinseca di social network. Per la Progettazione, ho utilizzato la tecnica del **reiterative development**, mischiato ad un **Feedback Loop** di utenti informali che usano social network tutti i giorni (familiari, amici, colleghi.).

Ho iniziato la progettazione partendo dalla UI, sia per Desktop che per mobile:

![Android Large - 1](https://github.com/zeke-code/recipy/assets/116798879/c187d2ef-1292-44df-97af-c5ff5311799e)
![Desktop - 1](https://github.com/zeke-code/recipy/assets/116798879/1747fcef-55b3-46a7-a449-31fd1256261d)


Alcuni elementi sono stati rimossi in produzione rispetto ai mockup, come ad esempio il tasto **condividi** e la **bottom navbar nel mockup mobile**; questo a causa di inutilizzo da parte degli utenti che hanno testato l'applicazione.

La scelta dei colori è stata dettata dall'intenzione di rendere l'applicazione riconoscibile e non banale (creare una light mode e dark mode per il sito sarebbe risultato in un aspetto estetico comune e non riconoscibile.).

Sin dall'inizio l'applicazione è stata progettata con l'intenzione di essere una specie di social network; quindi il database è stato progettato proprio con questo in mente.

![db-diagram](https://github.com/zeke-code/recipy/assets/116798879/1a1f0764-949f-4074-b8c9-8d44e2d0fdfd)


Il DB potrebbe essere modificato per favorire migliori prestazioni attraverso la denormalizzazione (ad esempio nell'entità delle ricette potremmo avere un attributo chiamato "like_count", per evitare che grossi numeri di like in un post rallentino l'applicazione), ma ciò non è stato fatto per la piccola dimensione dell'applicazione.


## Funzionalità

L'utente su Recipy può:

- [x]  Effettuare il login.
- [x]  Effettuare il logout.
- [x]  Condividere post.
- [x]  Visualizzare un post.
- [x]  Commentare un post.
- [x]  Visualizzare i commenti di un post.
- [x]  Salvare un post tra i preferiti.
- [x]  Mettere "mi piace" a un post.
- [x]  Visualizzare i propri post.
- [x]  Visualizzare i post preferiti.
- [x]  Cercare una ricetta per nome.
- [x]  Visualizzare i post più popolari.

## Sfide E Difficoltà

- Una sfida era quella di avere una navbar che cambiasse radicalmente in base al dispositivo che visualizza il sito. Per questo ho creato 3 componenti differenti che vengono visualizzati in base alla dimensione della viewport.

- La sfida maggiore è stata rappresentata dalla scelta di salvare immagini sul filesystem. I form standard HTML non sono sufficienti per inviare immagini. Per ovviare al problema, ho inizialmente pensato di utilizzare un cloud storage, ma poi ho abbandonato l'idea perché costoso e inutile per un'applicazione così piccola (inoltre mi sembrava una soluzione che non mi desse modo di espandere il backend). Così ho deciso di trasformare il form della sezione "Crea Post" in un **multipart form**, in modo da poter allegare un'immagine con esso. Il parsing del form è effettuato da [Multer](https://github.com/expressjs/multer), middleware che permette di effettuare il parsing di questo form e di scrivere nel filesystem. In questo modo, tutte le immagini vengono salvate nel filesystem del server. Il database contiene solo il nome dell'immagine che è stata caricata, e Multer salva l'immagine nella cartella per i file statici. Al momento dal lato della sicurezza questo form lascia un po' a desiderare, ma essendo da solo per mancanza di tempo non sono riuscito ad inserire dei controlli riguardo al tipo di file caricato (solamente client-side, facilmente raggirabile).
## Setup e Deployment

Installare XAMPP ed avviare Apache e MySQL.
Creare il database col nome **recipy** ed utilizzare i file .sql nella cartella db per eseguire le query per creare le tabelle da phpmyadmin.

Navigare nella cartella del frontend dal terminale e digitare:
```
npm install
```

Navigare nella cartella del backend dal terminale e digitare:
```
npm install
```

Navigare di nuovo nella cartella del frontend dal terminale e digitare:
```
npm run build
```

Spostare la cartella **dist** appena creata dentro il backend e rinominarla **dist-frontend**.

Navigare di nuovo nella cartella del backend e digitare:

```
npm run build
npm run start
```

Per far si che gli upload delle immagini funzionino in fase di deployment, **navigare nella cartella backend e creare la cartella public, e nella cartella public creare la cartella figlia img**.


## Crediti

- Ezechiele Spina - [zeke-code](https://github.com/zeke-code)

This project was created as an assignment for the Engineering Of Web Systems course of the Technologies of Informatics System department of the University of Bologna.
