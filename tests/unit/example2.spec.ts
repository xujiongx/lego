import { shallowMount, VueWrapper } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import Hello from "@/components/Hello.vue";
import axios from "axios";
import flushPromises from "flush-promises";

jest.mock("axios");

const mockAxios = axios as jest.Mocked<typeof axios>;
const msg = "new message";
let wrapper: VueWrapper<any>;
describe("HelloWorld.vue", () => {
  beforeAll(() => {
    wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
  });
  it("renders props.msg when passed", () => {
    console.log(wrapper.html());
    console.log(wrapper.get("h1").text());
    // console.log(wrapper.get('h2').text());
    // console.log(wrapper.find('h2').text());
    console.log(wrapper.findComponent(Hello).props());

    expect(wrapper.text()).toMatch(msg);
  });

  it("button click", async () => {
    await wrapper.get("button").trigger("click");
    console.log(111, wrapper.get("button").text());

    expect(wrapper.get("button").text()).toBe("2");
  });
  it("input setValue", async () => {
    const inputValue = "xujiong";

    await wrapper.get("input").setValue(inputValue);
    expect(wrapper.get("input").element.value).toBe(inputValue);

    await wrapper.get(".addTodo").trigger("click");
    expect(wrapper.findAll("li")).toHaveLength(1);
    expect(wrapper.get("li").text()).toBe(inputValue);

    console.log(wrapper.emitted());
    expect(wrapper.emitted()).toHaveProperty("send");
    const events = wrapper.emitted("send") || [];
    expect(events[0]).toEqual([inputValue]);
  });

  it("axios test", async () => {
    mockAxios.get.mockResolvedValueOnce({ data: { username: "xujiong" } });

    await wrapper.get(".loadUser").trigger("click");
    // console.log(wrapper.get('.userName').text());
    console.log(wrapper.get(".loading").text());
    expect(mockAxios.get).toHaveBeenCalled();
    expect(wrapper.find(".loading").exists()).toBeTruthy();

    await flushPromises();
    // 界面更新完毕
    expect(wrapper.find(".loading").exists()).toBeFalsy();
    console.log(wrapper.get(".userName").text());
    expect(wrapper.get(".userName").text()).toBe("xujiong");
  });
});
