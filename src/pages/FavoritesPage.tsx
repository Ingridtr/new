import React, {useEffect, useState} from "react";

import {Link} from 'react-router-dom'; 

import {pages as allPages} from "../data/pagesData"; 


const stored = localStorage.getItem("favorites"); 
const favoritesId = JSON.parse(stored || "[]" )

const favorites = allPages.filter(p => favoritesId.includes(p.id))



