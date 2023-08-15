# react-todo
Supabaseの設定  
```
// ./src/config.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "ここにsupabaseのURL";
const supabaseKey = "ここにsupabaseのAPIKey";

export const supabase = createClient(supabaseUrl, supabaseKey);

```


