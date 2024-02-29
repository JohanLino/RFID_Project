package org.utl.dsm.REST;

import com.google.gson.Gson;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.utl.dsm.controller.ControllerAlumno;
import org.utl.dsm.controller.ControllerAsistencia;
import org.utl.dsm.controller.ControllerConferencia;
import org.utl.dsm.model.Asistencia;

@Path("asistencia")
public class AsistenciaEndPoints {

    @Path("alumno")
    @POST
    @Produces(MediaType.TEXT_PLAIN)
    public Response enviarNombre() {
        ControllerAlumno ca = new ControllerAlumno();
        String matricula = "";
        String out = "";
        try {
            matricula = ca.readRFDI();
            out = matricula;

        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        System.out.println(out);
        return Response.ok(out).build();
    }

    @Path("getall")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAsistencias() {
        ControllerAsistencia casis = new ControllerAsistencia();
        String out = "";

        List<Asistencia> asistencias = casis.getAll();
        Gson gson = new Gson();
        out = gson.toJson(asistencias);
        System.out.println(out);

        return Response.ok(out)
                .build();
    }

    @Path("asistencia")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response registrarAsistencias() {
        ControllerAsistencia ca = new ControllerAsistencia();
        Asistencia asis = new Asistencia();
        Gson gson = new Gson();
        String out = "";
        try {
            asis = ca.insertarAsistencia();
            out = gson.toJson(asis);

        } catch (SQLException ex) {
            ex.printStackTrace();
            out = """
                {"error": "Problemas en el servidor de BD"}
                """;
        }
        System.out.println(out);
        return Response.ok(out).build();
    }

    @Path("tiempoinicio")
    @POST
    @Produces(MediaType.TEXT_PLAIN)
    public Response tiempoInicio() {
        ControllerConferencia confe = new ControllerConferencia();
        String horaInicio="";
        try {
            horaInicio=confe.tiempoIncio();

        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        System.out.println(horaInicio);
        return Response.ok(horaInicio).build();
    }

}
