import BP from "bp-api";

const { bpDomain, bpLogin, bpPassword } = useRuntimeConfig();
const bp = new BP.default(bpDomain, bpLogin, bpPassword);

export default defineEventHandler((event) => {
  event.context.$bp = bp;
});
