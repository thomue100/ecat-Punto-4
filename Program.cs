
var builder = WebApplication.CreateBuilder(args);
// ... andere Konfigurationen, die nichts mit Routing zu tun haben ...

var app = builder.Build();

// 1. ZUERST: Deaktivieren Sie, wenn vorhanden, die Standard-Welcome-Seite/Controller-Logik.
// Wenn Sie in Ihrem Projekt "app.MapControllers()" oder "app.MapRazorPages()" sehen,
// muss der Aufruf Ihrer statischen Dateien VOR diesen kommen, ODER Sie müssen die Standard-Route für "/" löschen.

// 2. USE DEFAULT FILES: Sagt der App, dass sie nach index.html suchen soll, wenn der Pfad nur "/" ist.
app.UseDefaultFiles();

// 3. USE STATIC FILES: Ermöglicht das Servieren der Datei, die von UseDefaultFiles gefunden wurde.
app.UseStaticFiles();

// app.MapGet("/", ...) MUSS ENTFERNT ODER AUSKOMMENTIERT WERDEN

// app.MapControllers(); // Wenn vorhanden, sollte dieser Aufruf nach den statischen Dateien erfolgen,
// app.MapRazorPages(); // da sonst die Index-Seite des Controllers Vorrang hat.

app.Run();
