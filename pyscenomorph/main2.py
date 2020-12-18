import toga
from toga.style.pack import COLUMN, LEFT, RIGHT, ROW, Pack, BOTTOM


class ScenoMorph(toga.App):
    parameter_inputs = []

    actor_inputs = []
    goal_inputs = []
    method_inputs = []
    means_input = []

    def startup(self):
        # Header
        # header_label = toga.Label(
        #     "ScenoMorph", style=Pack(font_size=16, text_align=LEFT)
        # )
        # underheader = toga.Label(
        #     " Scenario modelling with morphological analysis",
        #     style=Pack(font_size=8, text_align=LEFT, color="#303030"),
        # )
        # header_box = toga.Box(
        #     children=[header_label, underheader],
        #     style=Pack(direction=COLUMN, padding_bottom=10),
        # )

        add_parameter_button = toga.Button(
            "Add Parameter",
            style=Pack(padding=10, alignment="center"),
        )

        control_box = toga.Box(
            children=[add_parameter_button],
            style=Pack(direction=COLUMN),
        )

        left_container = toga.ScrollContainer(
            content=control_box,
            #style=Pack(width=500)
        )
        right_container = toga.ScrollContainer(
            content=toga.Box(
                children=[toga.Label("fdsdgfdesgfdgfdsgfdsgfd", style=Pack(font_size=12, text_align=LEFT))],
                style=Pack(direction=COLUMN),
            ),
            #style=Pack(width=500)
        )
        split = toga.SplitContainer(content=[(left_container,2,True), (right_container,1,True)])
        split_box = toga.Box(children=[split,], style=Pack(width=1000))


        def add_parameters(widget):
            self.parameter_inputs.append(
                toga.TextInput(
                    f"parameter_{len(self.actor_inputs)}",
                    style=Pack(
                        padding_left=10,
                        padding_right=10,
                        padding_top=2,
                        padding_bottom=2,
                    ),
                )
            )
            control_box.add(self.parameter_inputs[-1])

        add_parameter_button.on_press = add_parameters
        # add_actor_button.on_press = add_actor
        # add_goal_button.on_press = add_goal
        # add_method_button.on_press = add_method
        # add_means_button.on_press = add_means
        # button.on_press = on_next

        self.main_window = toga.Window(size=(1000, 600), resizeable=True)
        self.main_window.content = split_box

        self.main_window.show()

    def transition_from_first_to_second(self, *args):

        # TODO: Add validation

        actors = [x.value for x in self.actor_inputs]
        goals = [x.value for x in self.goal_inputs]
        methods = [x.value for x in self.method_inputs]
        means = [x.value for x in self.means_input]


        print("Transition!")


def main():
    return ScenoMorph(
        formal_name="Scenomorph",
        app_id="org.nedomkull.scenomorph",
        app_name="Scenomorph",
        description="Scenario modelling with morphological analysis"
    )


if __name__ == "__main__":
    app = main()
    app.main_loop()
