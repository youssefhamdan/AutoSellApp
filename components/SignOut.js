import React, { useState, useEffect } from 'react';
import { supabase } from "../client";


export default function SignOut({ navigation }) {
    useEffect(()=>{
            supabase.auth.signOut();
    });
    return (<></>);
}