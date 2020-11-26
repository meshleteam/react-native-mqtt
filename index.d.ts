export type QoS = 0 | 1 | 2;

export class IMqttClient {
  constructor(options: {
    clientId: string;
    uri: string;
    host?: string;
    port?: number;
    protocol?: "mqtt" | "tcp" | "wss" | "mqtts" | "ws";
    tls?: boolean;
    keepalive?: number; // seconds
    protocolLevel?: number;
    clean?: boolean;
    auth?: boolean;
    user?: string; // only used when auth is true
    pass?: string; // only used when auth is true
    will?: boolean;
    willMsg?: string; // only used when will is true
    willtopic?: string; // only used when will is true
    willQos?: QoS; // only used when will is true
    willRetainFlag: boolean; // only used when will is true
    automaticReconnect?: boolean; // android only
  });
  on(event: "closed", cb: (msg: string) => void): void;
  on(event: "error", cb: (msg: string) => void): void;
  on(
    event: "message",
    cb: (msg: {
      data: string;
      qos: QoS;
      retain: boolean;
      topic: string;
    }) => void
  ): void;
  on(event: "connect", cb: (msg: { reconnect: boolean }) => void): void;
  connect(): void;
  disconnect(): void;
  subscribe(topic: string, qos: QoS): void;
  unsubscribe(topic: string): void;
  publish(topic: string, payload: string, qos: QoS, retain: boolean): void;
  reconnect(): void;
  isConnected(): Promise<boolean>;
}

export type ClientOptions = {
  /** unique identifier for your client */
  clientId: string;
  /** username */
  user?: string;
  /** password */
  pass?: string;
  /** override by uri if set to mqtts or wss */
  tls?: boolean;
  keepAlive?: number;
};
declare namespace mqtt {
  function createClient(
    options: {
      /** protocol://host:port, protocol is [mqtt | mqtts] */
      uri: string;
    } & ClientOptions
  );
  function createClient(
    options: {
      /** ipaddress or host name (override by uri if set) */
      host: string;
      /** port number (override by uri if set) */
      port: string;
      /** Set to true if user or pass exist */
      auth: boolean;
    } & ClientOptions
  ): Promise<IMqttClient>;
  function removeClient(client: IMqttClient): void;
  function disconnectAll(): void;
}

export default mqtt;
