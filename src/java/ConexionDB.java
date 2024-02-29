
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionDB {

    public static Connection getConnection() {
        Connection conexion = null;
        String url = "jdbc:mysql://localhost:3306/UTL"; // Cambia "UTL" por el nombre de tu base de datos
        String usuario = "root";
        String contraseña = "TodoBien123";

        try {
            conexion = DriverManager.getConnection(url, usuario, contraseña);
            System.out.println("Conexión establecida.");
        } catch (SQLException e) {
            System.out.println("Error al conectar a la base de datos: " + e.getMessage());
        }

        return conexion;
    }
}
