#!/bin/bash

files=("1c" "marketplaces" "ai-providers" "honest-sign")

for file in "${files[@]}"; do
  title=$(echo "$file" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1')
  
  cat > "$file.html" << HTMLEOF
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$title | Документация AI Seller 1С</title>
  <meta name="description" content="Документация по интеграции: $title">
  
  <!-- Yandex.Metrika counter -->
  <script type="text/javascript">
      (function(m,e,t,r,i,k,a){
          m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
      })(window, document,'script','https://mc.yandex.ru/metrika/tag.js ', 'ym');

      ym(97440235, 'init', {webvisor:true, clickmap:true, referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
  </script>
  <noscript><div><img src="https://mc.yandex.ru/watch/97440235 " style="position:absolute; left:-9999px;" alt="" /></div></noscript>
  <!-- /Yandex.Metrika counter -->
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root { --color-primary: #1e3a8a; --color-primary-light: #3b82f6; --color-text: #1e293b; --color-text-muted: #64748b; --color-bg: #f8fafc; --color-bg-white: #ffffff; --color-border: #e2e8f0; }
    body { font-family: Inter, sans-serif; color: var(--color-text); background: var(--color-bg); line-height: 1.7; }
    a { color: var(--color-primary-light); text-decoration: none; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    .page-header { padding: 72px 0 56px; text-align: center; background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); color: white; border-radius: 0 0 24px 24px; margin-bottom: 56px; }
    .page-header h1 { font-size: clamp(32px, 6vw, 48px); font-weight: 700; margin-bottom: 16px; }
    .content-section { background: white; border-radius: 16px; padding: 40px; margin-bottom: 32px; border: 1px solid var(--color-border); }
    .content-section h2 { font-size: 24px; margin-bottom: 20px; color: var(--color-primary); }
    .content-section p { margin-bottom: 16px; color: var(--color-text-muted); }
    code { font-family: JetBrains Mono, monospace; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; }
    .badge { display: inline-block; padding: 4px 12px; background: #eff6ff; color: var(--color-primary); border-radius: 12px; font-size: 12px; font-weight: 600; }
  </style>
</head>
<body>
  <header id="header-placeholder"></header>
  <main>
    <div class="page-header">
      <div class="container">
        <span class="badge">Интеграции</span>
        <h1>$title</h1>
        <p class="text-xl opacity-90 max-w-3xl mx-auto">Документация по интеграции с $title</p>
      </div>
    </div>
    <div class="container">
      <nav class="mb-8 text-sm text-gray-600">
        <a href="/" class="hover:text-blue-600">Главная</a> → <a href="/docs/" class="hover:text-blue-600">Документация</a> → <a href="/docs/integrations" class="hover:text-blue-600">Интеграции</a> → <span class="text-gray-900">$title</span>
      </nav>
      <section class="content-section">
        <h2>📝 Обзор</h2>
        <p>Полная документация по интеграции будет доступна в ближайшее время. Эта страница-заглушка создана для обеспечения работоспособности ссылок.</p>
      </section>
      <div class="text-center mt-12 mb-12">
        <a href="/trial" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition mr-4">🚀 Попробовать бесплатно</a>
        <a href="/docs/integrations" class="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-8 rounded-lg transition">← Все интеграции</a>
      </div>
    </div>
  </main>
  <footer id="footer-placeholder"></footer>
  <script>
    fetch("/includes/header.html").then(r => r.text()).then(html => document.getElementById("header-placeholder").innerHTML = html);
    fetch("/includes/footer.html").then(r => r.text()).then(html => document.getElementById("footer-placeholder").innerHTML = html);
  </script>
</body>
</html>
HTMLEOF
  echo "✓ Создан: $file.html"
done
echo "Готово!"
