package upnplib;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.URL;
import java.net.URLConnection;
import java.text.DateFormat;
import java.util.Date;
import java.util.Map;

/**
 * This class contains a trivial main method that can be used to test whether
 * weupnp is able to manipulate port mappings on a IGD (Internet Gateway
 * Device) on the same network.
 *
 * @author Alessandro Bahgat Shehata
 */
public class Main {

	private static int SAMPLE_PORT = 6991;
	private static short WAIT_TIME = 10;
	private static boolean LIST_ALL_MAPPINGS = false;

	public static void main(String[] args) throws Exception{

		addLogLine("Starting weupnp");

		GatewayDiscover gatewayDiscover = new GatewayDiscover();
		addLogLine("Looking for Gateway Devices...");

		Map<InetAddress, GatewayDevice> gateways = gatewayDiscover.discover();
		
		if (gateways.isEmpty()) {
			addLogLine("No gateways found");
			addLogLine("Stopping weupnp");
			return;
		}
		addLogLine(gateways.size()+" gateway(s) found\n");
        
		int counter=0;
		for (GatewayDevice gw: gateways.values()) {
			counter++;
			addLogLine("Listing gateway details of device #" + counter+
					"\n\tFriendly name: " + gw.getFriendlyName()+
					"\n\tPresentation URL: " + gw.getPresentationURL()+
					"\n\tModel name: " + gw.getModelName()+
					"\n\tModel number: " + gw.getModelNumber()+
					"\n\tLocal interface address: " + gw.getLocalAddress().getHostAddress()+
					"\n\tBaseURL: "+gw.getURLBase()+
					"\n\tSCPDURLCIF: "+gw.getSCPDURLCIF()+
					"\n\tSCPDURL: "+gw.getSCPDURL()+
					"\n\tControlURL: "+gw.getControlURL()+
					"\n\tControlURLCIF: "+gw.getControlURLCIF()+"\n");
			URL url=new URL(gw.getSCPDURL());
			URLConnection urlc=url.openConnection();
			urlc.connect();
			InputStream in=urlc.getInputStream();
	        FileOutputStream fo=new FileOutputStream(new File("serviceDescrition.txt"));
	        byte[] buffer=new byte[1024];
	        int numberBytesRead=0;
	        numberBytesRead=in.read(buffer);
	        while(numberBytesRead!=-1)
	        {  
	        	   fo.write(buffer,0,numberBytesRead);
	        	   numberBytesRead=in.read(buffer);
	        }
		}
		
		// choose the first active gateway for the tests
		GatewayDevice activeGW = gatewayDiscover.getValidGateway();

		if (null != activeGW) {
			addLogLine("Using gateway: " + activeGW.getFriendlyName());
		} else {
			addLogLine("No active gateway device found");
			addLogLine("Stopping weupnp");
			return;
		}
		
		
        
		// testing PortMappingNumberOfEntries
		//Integer portMapCount = activeGW.getPortMappingNumberOfEntries();
		//addLogLine("GetPortMappingNumberOfEntries: " + (portMapCount!=null?portMapCount.toString():"(unsupported)"));
        boolean success=activeGW.addPortMapping(80, 80, "192.168.0.105", "TCP", "TestOnly");
        System.out.println(success);
        /*
		//testing getGenericPortMappingEntry
		PortMappingEntry portMapping = new PortMappingEntry();
		if (LIST_ALL_MAPPINGS) {
			int pmCount = 0;
			do {
				if (activeGW.getGenericPortMappingEntry(pmCount,portMapping))
					addLogLine("Portmapping #"+pmCount+" successfully retrieved ("+portMapping.getPortMappingDescription()+":"+portMapping.getExternalPort()+")");
				else{
					addLogLine("Portmapping #"+pmCount+" retrieval failed"); 
					break;
				}
				pmCount++;
			} while (portMapping!=null);
		} else {
			if (activeGW.getGenericPortMappingEntry(0,portMapping))
				addLogLine("Portmapping #0 successfully retrieved ("+portMapping.getPortMappingDescription()+":"+portMapping.getExternalPort()+")");
			else
				addLogLine("Portmapping #0 retrival failed");        	
		}

		InetAddress localAddress = activeGW.getLocalAddress();
		addLogLine("Using local address: "+ localAddress.getHostAddress());
		String externalIPAddress = activeGW.getExternalIPAddress();
		addLogLine("External address: "+ externalIPAddress);

		addLogLine("Querying device to see if a port mapping already exists for port "+ SAMPLE_PORT);

		if (activeGW.getSpecificPortMappingEntry(SAMPLE_PORT,"TCP",portMapping)) {
			addLogLine("Port "+SAMPLE_PORT+" is already mapped. Aborting test.");
			return;
		} else {
			addLogLine("Mapping free. Sending port mapping request for port "+SAMPLE_PORT);

			// test static lease duration mapping
			if (activeGW.addPortMapping(SAMPLE_PORT,SAMPLE_PORT,localAddress.getHostAddress(),"TCP","test")) {
				addLogLine("Mapping SUCCESSFUL. Waiting "+WAIT_TIME+" seconds before removing mapping...");
				Thread.sleep(1000*WAIT_TIME);

				if (activeGW.deletePortMapping(SAMPLE_PORT,"TCP")) {
					addLogLine("Port mapping removed, test SUCCESSFUL");
                } else {
					addLogLine("Port mapping removal FAILED");
                }
			}
		} */

		addLogLine("Stopping weupnp");
	}

	private static void addLogLine(String line) {

		String timeStamp = DateFormat.getTimeInstance().format(new Date());
		String logline = timeStamp+": "+line+"\n";
		System.out.print(logline);
	}

}
